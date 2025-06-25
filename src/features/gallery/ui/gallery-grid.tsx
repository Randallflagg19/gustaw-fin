"use client";

import React from "react";
import { ImageGrid } from "@/shared/image-grid";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import useUserStore from "@/entities/user/model/user-store";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import { useLikesSummary } from "../../likes/hooks/useLikesSummary"; // Импортируем хук

export function GalleryGrid({
  images,
}: {
  images: (PostResult & { id: string })[];
}) {
  const user = useUserStore((s) => s.user);

  // Используем кастомный хук
  useLikesSummary(images, user?.id);
  return (
    <ImageGrid
      images={images}
      getImage={(imageData, index) => (
        <CloudinaryImage
          key={imageData.publicId}
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
