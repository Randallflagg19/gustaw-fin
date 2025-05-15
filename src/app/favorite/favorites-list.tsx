"use client";

import { useEffect, useState } from "react";
import { ImageGrid } from "@/shared/image-grid";
import { PostResult } from "@/features/gallery/services/getDataBasePhotos";
import { DatabaseImage } from "@/features/gallery/containers/database-image";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: PostResult[];
}) {
  const [resources, setResources] = useState<PostResult[]>(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData) => (
        <DatabaseImage
          key={imageData.id}
          imageData={imageData}
          onLike={(likedResource) => {
            setResources((currentResources) =>
              currentResources.filter(
                (resource) => resource.id !== likedResource.id,
              ),
            );
          }}
        />
      )}
    />
  );
}
