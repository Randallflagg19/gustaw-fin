"use client";

import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import React, { ReactNode } from "react";

export function ImageGrid({
  images,
  getImage,
}: {
  images: PostResult[];
  getImage: (imageData: PostResult, index: number) => ReactNode;
}) {
  return (
    <div className="mx-auto columns-1 gap-5 pt-2 sm:columns-2 lg:columns-3 lg:gap-6">
      {images.map((img, i) => (
        <div
          key={img.publicId}
          className="mb-5 break-inside-avoid lg:mb-6"
        >
          {getImage(img, i)}
        </div>
      ))}
    </div>
  );
}
