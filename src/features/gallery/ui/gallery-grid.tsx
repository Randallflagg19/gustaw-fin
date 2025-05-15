"use client";

import { PostResult } from "@/features/gallery/services/getDataBasePhotos";
import { ImageGrid } from "@/shared/image-grid";
import { DatabaseImage } from "@/features/gallery/containers/database-image"; // создай его как я показал выше
import React from "react";

export function GalleryGrid({ images }: { images: PostResult[] }) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: PostResult) => {
        return <DatabaseImage key={imageData.id} imageData={imageData} />;
      }}
    />
  );
}
