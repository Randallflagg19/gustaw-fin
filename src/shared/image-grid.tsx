"use client";

import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import React, { ReactNode } from "react";

export function ImageGrid({
  images,
  getImage,
}: {
  images: SearchResult[];
  getImage: (imageData: SearchResult, index: number) => ReactNode;
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
        <div key={img.public_id} className="break-inside-avoid mb-4">
          {getImage(img, i)}
        </div>
      ))}
    </div>
  );
}
