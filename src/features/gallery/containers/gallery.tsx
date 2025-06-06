import React from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";
import { getDataBasePhotos } from "@/features/gallery/services/getDataBasePhotos";
import { UploadWrapper } from "@/features/gallery/containers/upload-wrapper";

export async function Gallery() {
  const photosFromDb = await getDataBasePhotos();

  return (
    <section className="w-full">
      <UploadWrapper />
      {/* сетка фоток */}
      <GalleryGrid
        images={photosFromDb.map((photo) => ({
          id: photo.id,
          mediaUrl: photo.mediaUrl ?? "", // добавляем mediaUrl
          publicId: photo.publicId ?? "", // добавляем publicId
          createdAt: photo.createdAt, // добавляем createdAt
          likesCount: photo.likesCount,
          commentCount: photo.commentCount,
        }))}
      />
    </section>
  );
}
