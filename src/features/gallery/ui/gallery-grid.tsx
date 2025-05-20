"use client";

import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import { ImageGrid } from "@/shared/image-grid";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import React from "react";
import useStore from "@/features/user/user";

export function GalleryGrid({ images }: { images: SearchResult[] }) {
  const { user } = useStore();

  console.log(user);

  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult, index: number) => {
        return (
          // CldImage с сердечком и обработкой
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="300"
            height="400"
            alt="Gallery image"
            priority={index < 6}
          />
        );
      }}
    />
  );
}
