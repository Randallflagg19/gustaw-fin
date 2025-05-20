import React from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";
import { getDataBasePhotos } from "@/features/gallery/services/getDataBasePhotos";
import { UploadWrapper } from "@/features/gallery/containers/upload-wrapper";

export async function Gallery() {
  const photosFromDb = await getDataBasePhotos();

  return (
    <section className="w-full">
      <UploadWrapper />
      {/* тут сетка фоток: компонент сетки и внутри массив*/}
      <GalleryGrid
        images={photosFromDb.map((photo) => ({
          public_id: photo.publicId ?? "",
          tags: [],
          height: "500", // или можно позже расширить
          width: "500",
          secure_url: photo.mediaUrl ?? "",
          // 👇 необязательно, но можно добавить кастомные поля, если компонент поддерживает
          id: photo.id,
          likesCount: photo.likesCount,
          commentCount: photo.commentCount,
        }))}
      />
    </section>
  );
}
