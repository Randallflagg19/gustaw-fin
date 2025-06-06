import { useEffect } from "react";
import useLikesStore, { LikeInfo } from "@/entities/like/model/likes-store";
import { PostResult } from "@/features/gallery/services/getDataBasePhotos";

async function fetchLikesSummary(
  photoIds: string[],
  userId: string | undefined,
) {
  const response = await fetch("/api/likes/photosSummary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ photoIds, userId }),
  });

  if (!response.ok) {
    throw new Error("Network response was not OK");
  }

  return response.json() as Promise<Record<string, LikeInfo>>;
}

export function useLikesSummary(images: PostResult[], userId: string) {
  const setLikesBatch = useLikesStore((s) => s.setLikesBatch);

  useEffect(() => {
    if (userId) {
      // Получаем лайки для новых изображений
      const photoIds = images.map((img) => img.publicId);

      fetchLikesSummary(photoIds, userId)
        .then((batch) => {
          setLikesBatch(batch); // Обновляем состояние лайков
        })
        .catch((err) => {
          console.error("Ошибка при получении лайков", err);
        });
    }
  }, [images, userId, setLikesBatch]);
}
