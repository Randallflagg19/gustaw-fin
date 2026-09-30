"use client";

import React from "react";
import { ImageGrid } from "@/shared/image-grid";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";

export function GalleryGrid({
  images,
}: {
  images: (PostResult & { id: string })[];
}) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData) => (
        <CloudinaryImage
          key={imageData.publicId}
          imageData={imageData}
          width="400"
          height="500"
          alt="Gallery image"
          sizes="(min-width: 1200px) 368px, (min-width: 1024px) calc((100vw - 80px) / 3), (min-width: 640px) calc((100vw - 52px) / 2), calc(100vw - 32px)"
        />
      )}
    />
  );
}
