"use client";

import { CloudinaryImage } from "@/features/gallery/containers/cloudinary-image";
import { SearchResult } from "@/features/gallery/api/getCloudinaryPhotos";
import { useEffect, useState } from "react";
import { ImageGrid } from "@/shared/image-grid";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="300"
            height="400"
            alt="Gallery image"
            onUnheart={(unheartedResource) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unheartedResource.public_id,
                ),
              );
            }}
          />
        );
      }}
    />
  );
}
