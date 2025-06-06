"use client";

import React from "react";
import { ImageGrid } from "@/shared/image-grid";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import useUserStore from "@/entities/user/model/user-store";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import { useLikesSummary } from "../../likes/hooks/useLikesSummary"; // Импортируем хук

export function GalleryGrid({
  images,
}: {
  images: (SearchResult & { id: string })[];
}) {
  const user = useUserStore((s) => s.user);

  // получаем лайки на фотках
  // и лайкнул ли юзер фото
  useLikesSummary(images, user?.id);

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
