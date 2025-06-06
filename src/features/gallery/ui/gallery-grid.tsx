// features/gallery/ui/gallery-grid.tsx
"use client";

import React, { useEffect } from "react";
import { ImageGrid } from "@/shared/image-grid";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import useUserStore from "@/entities/user/model/user-store";
import useLikesStore, { LikeInfo } from "@/entities/like/model/likes-store";

export function GalleryGrid({
  images,
}: {
  images: (SearchResult & { id: string })[];
}) {
  const user = useUserStore((s) => s.user);
  const setBatch = useLikesStore((s) => s.setBatch);
  const loaded = useLikesStore((s) => s.loaded);

  useEffect(() => {
    // собираем массив photoIds из пропсов
    const photoIds = images.map((img) => img.public_id);

    // Пока не загрузили — делаем batch-fetch
    if (!loaded) {
      fetch("/api/likes/batch-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoIds,
          userId: user?.id, // может быть undefined, если неавторизован
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not OK");
          return res.json() as Promise<
            Record<string, { count: number; isLiked: boolean }>
          >;
        })
        .then((batch) => {
          // batch: { [photoId]: { count, isLiked } }
          // Конвертируем в нужный формат для zustand (LikeInfo уже совпадает)
          const prepared: Record<string, LikeInfo> = {};
          Object.entries(batch).forEach(([pid, info]) => {
            prepared[pid] = { count: info.count, isLiked: info.isLiked };
          });
          setBatch(prepared);
        })
        .catch((err) => {
          console.error("Ошибка batch-status:", err);
        });
    }
  }, [images, user?.id, loaded, setBatch]);

  return (
    <ImageGrid
      images={images}
      getImage={(imageData, index) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="300"
            height="400"
            alt="Gallery image"
            priority={index < 6}
            // Не обязательно передавать onLike, т. к. каждый CloudinaryImage
            // сам будет вызывать zustand-экшн через useLikesStore.toggleLikeAsync
          />
        );
      }}
    />
  );
}
