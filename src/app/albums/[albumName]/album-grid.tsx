"use client";

import { ImageGrid } from "@/shared/image-grid";
import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import { SearchResult } from "@/features/gallery/api/getCloudinaryPhotos";

export function AlbumGrid({ images }: { images: SearchResult[] }) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="300"
            height="400"
            alt="Gallery image"
          />
        );
      }}
    />
  );
}
