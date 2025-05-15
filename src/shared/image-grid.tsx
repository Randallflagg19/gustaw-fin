"use client";

import React, { ReactNode } from "react";
import { PostResult } from "@/features/gallery/services/getDataBasePhotos";

export function ImageGrid({
  images,
  getImage,
}: {
  images: PostResult[];
  getImage: (imageData: PostResult, index: number) => ReactNode;
}) {
  return (
    <div
      className="pt-8
                 columns-1
                 sm:columns-2
                 md:columns-3
                 gap-4
                 mx-auto
                 px-4
                 max-w-[1280px]"
    >
      {images.map((img, i) => (
        <div key={img.id} className="break-inside-avoid mb-4">
          {getImage(img, i)}
        </div>
      ))}
    </div>
  );
}
