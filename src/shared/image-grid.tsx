"use client";

import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import React, { ReactNode, useEffect, useState } from "react";

function getColumnCount() {
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

export function ImageGrid({
  images,
  getImage,
}: {
  images: PostResult[];
  getImage: (imageData: PostResult, index: number) => ReactNode;
}) {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumnCount = () => setColumnCount(getColumnCount());
    const tabletQuery = window.matchMedia("(min-width: 640px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    updateColumnCount();
    tabletQuery.addEventListener("change", updateColumnCount);
    desktopQuery.addEventListener("change", updateColumnCount);

    return () => {
      tabletQuery.removeEventListener("change", updateColumnCount);
      desktopQuery.removeEventListener("change", updateColumnCount);
    };
  }, []);

  const columns = Array.from(
    { length: columnCount },
    () =>
      [] as {
        image: PostResult;
        index: number;
      }[],
  );

  images.forEach((image, index) => {
    columns[index % columnCount].push({ image, index });
  });

  return (
    <div className="mx-auto grid grid-cols-1 items-start gap-5 pt-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-col gap-5 lg:gap-6">
          {column.map(({ image, index }) => (
            <div key={image.publicId}>{getImage(image, index)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
