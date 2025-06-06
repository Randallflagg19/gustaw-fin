import { useEffect } from "react";
import useLikesStore, { LikeInfo } from "@/entities/like/model/likes-store";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";

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

export function useLikesSummary(
  images: SearchResult[],
  userId: string | undefined,
) {
  const setBatch = useLikesStore((s) => s.setLikesBatch);
  const loaded = useLikesStore((s) => s.isLoaded);

  useEffect(() => {
    if (!loaded) {
      const photoIds = images.map((img) => img.public_id);

      fetchLikesSummary(photoIds, userId)
        .then((batch) => {
          setBatch(batch);
        })
        .catch((err) => {
          console.error("Ошибка photosSummary:", err);
        });
    }
  }, [images, userId, loaded, setBatch]);
}
