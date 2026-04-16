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
      getImage={(imageData, index) => (
        <CloudinaryImage
          key={imageData.publicId}
          imageData={imageData}
          width="400"
          height="500"
          alt="Gallery image"
          priority={index < 6}
        />
      )}
    />
  );
}
