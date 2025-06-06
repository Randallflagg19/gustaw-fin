import { create } from "zustand";
import { getLikeCount } from "@/entities/like/services/getLikeCount";
import { toggleLike } from "@/entities/like/services/toggleLike";

export interface LikeInfo {
  count: number;
  isLiked: boolean;
}

export interface LikesStore {
  likes: Record<string, LikeInfo>;
  isLoaded: boolean;
  setLikesBatch: (batch: Record<string, LikeInfo>) => void;
  toggleLike: (photoId: string, userId: string) => Promise<void>;
}

const useLikesStore = create<LikesStore>((set, get) => ({
  likes: {},
  isLoaded: false,

  setLikesBatch: (batch) => set({ likes: batch, isLoaded: true }),

  toggleLike: async (photoId, userId) => {
    const store = get();
    const prev = store.likes[photoId];
    if (!prev) return;

    const newIsLiked = !prev.isLiked;
    const newCount = prev.count + (newIsLiked ? 1 : -1);
    set({
      likes: {
        ...store.likes,
        [photoId]: { count: newCount, isLiked: newIsLiked },
      },
    });

    try {
      await toggleLike(userId, photoId);
      const updatedCount = await getLikeCount(photoId);
      set((s) => ({
        likes: {
          ...s.likes,
          [photoId]: { count: updatedCount, isLiked: newIsLiked },
        },
      }));
    } catch (err) {
      console.error("Ошибка toggleLike:", err);
    }
  },
}));

export default useLikesStore;
