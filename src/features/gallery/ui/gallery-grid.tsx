// src/features/gallery/ui/gallery-grid.tsx
"use client";

import React, { useEffect } from "react";
import { ImageGrid } from "@/shared/image-grid";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import useUserStore from "@/entities/user/model/user-store";
import useLikesStore, { LikeInfo } from "@/entities/like/model/likes-store";

// Добавили этот импорт:
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";

export function GalleryGrid({
  images,
}: {
  images: (SearchResult & { id: string })[];
}) {
  const user = useUserStore((s) => s.user);
  const setBatch = useLikesStore((s) => s.setBatch);
  const loaded = useLikesStore((s) => s.loaded);

  useEffect(() => {
    const photoIds = images.map((img) => img.public_id);

    if (!loaded) {
      fetch("/api/likes/batch-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoIds,
          userId: user?.id,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not OK");
          return res.json() as Promise<Record<string, LikeInfo>>;
        })
        .then((batch) => {
          setBatch(batch);
        })
        .catch((err) => {
          console.error("Ошибка batch-status:", err);
        });
    }
  }, [images, user?.id, loaded, setBatch]);

  return (
    <ImageGrid
      images={images}
      getImage={(imageData, index) => (
        <CloudinaryImage
          key={imageData.public_id}
          imageData={imageData}
          width="300"
          height="400"
          alt="Gallery image"
          priority={index < 6}
        />
      )}
    />
  );
}
