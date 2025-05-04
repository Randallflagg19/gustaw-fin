"use client";

import { SearchResult } from "@/features/gallery/api/getCloudinaryPhotos";
import React, { ReactNode } from "react";

export function ImageGrid({
  images,
  getImage,
}: {
  images: SearchResult[];
  getImage: (imageData: SearchResult) => ReactNode;
}) {
  const MAX_COLUMNS = 4;

  function getColumns(colIndex: number) {
    return images.filter((results, index) => index % MAX_COLUMNS === colIndex);
  }

  return (
    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto px-4 max-w-[1280px]">
      {[getColumns(0), getColumns(1), getColumns(2)].map((column, index) => (
        <div key={index} className="flex flex-col gap-4">
          {column.map(getImage)}
        </div>
      ))}
    </div>
  );
}
