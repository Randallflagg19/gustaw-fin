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
    <div className="mx-auto grid grid-cols-1 gap-5 pt-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {images.map((img, i) => (
        <div key={img.publicId}>{getImage(img, i)}</div>
      ))}
    </div>
  );
}
