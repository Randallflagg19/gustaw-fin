// entities/like/model/useLikesStore.ts
import { create } from "zustand";
import { getLikeCount } from "@/entities/like/services/getLikeCount";

// Тип описывает одно фото
export interface LikeInfo {
  count: number;
  isLiked: boolean;
}

// Структура стора
export interface LikesStore {
  // byId: { [photoId]: LikeInfo }
  byId: Record<string, LikeInfo>;

  // Флаг «загрузили ли мы один раз всю пачку»?
  loaded: boolean;

  // Экшн: установить пачку лайков (например, из batch-status → { [id]: { count, isLiked } })
  setBatch: (batch: Record<string, LikeInfo>) => void;

  // Экшн: переключить один лайк (локально), а дальше уже «свой» асинхронный код
  toggleLikeLocally: (photoId: string) => void;

  // Асинхронный экшн: вызывает серверный toggleLike, а когда вернулся ответ — актуализирует `count` и `isLiked`
  // Предполагается, что toggleLike(photoId) внутри сделает нужный запрос
  toggleLikeAsync: (photoId: string, userId: string) => Promise<void>;
}

const useLikesStore = create<LikesStore>((set, get) => ({
  byId: {},
  loaded: false,

  setBatch: (batch) => set({ byId: batch, loaded: true }),

  toggleLikeLocally: (photoId) => {
    const store = get();
    const prev = store.byId[photoId];
    if (!prev) return; // если вдруг нет данных об этом фото
    // Переключаем флаг isLiked и изменяем count «на глаз»:
    const newIsLiked = !prev.isLiked;
    const newCount = prev.count + (newIsLiked ? 1 : -1);
    set({
      byId: {
        ...store.byId,
        [photoId]: { count: newCount, isLiked: newIsLiked },
      },
    });
  },

  toggleLikeAsync: async (photoId, userId) => {
    const store = get();
    const prev = store.byId[photoId];
    if (!prev) return;

    // Сначала «ломаем» UI локально, чтобы сердце закрасилось сразу:
    const newIsLiked = !prev.isLiked;
    const newCount = prev.count + (newIsLiked ? 1 : -1);
    set({
      byId: {
        ...store.byId,
        [photoId]: { count: newCount, isLiked: newIsLiked },
      },
    });

    try {
      // Делаем серверный вызов. Предполагаем, что toggleLike(userId, photoId)
      // делает «если нет записи → создаёт лайк», иначе «удаляет».
      await import("@/entities/like/services/toggleLike").then((mod) =>
        mod.toggleLike(userId, photoId),
      );
      // А после успешного ответа сервера лучше «подтянуть» точное число
      const updatedCount = await getLikeCount(photoId);
      // и зафиксировать его (на случай, если кто-то в это время поставил «свой» лайк)
      set((s) => ({
        byId: {
          ...s.byId,
          [photoId]: { count: updatedCount, isLiked: newIsLiked },
        },
      }));
    } catch (err) {
      console.error("Ошибка toggleLikeAsync:", err);
      // Если сервер вернул ошибку, откатим state в предыдущее состояние:
      set((s) => ({
        byId: {
          ...s.byId,
          [photoId]: prev,
        },
      }));
    }
  },
}));

export default useLikesStore;
