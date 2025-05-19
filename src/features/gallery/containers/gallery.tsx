import { UploadButton } from "@/features/gallery/containers/upload-button";
import React from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";
import { getMe } from "@/entities/user/services/get-me";
import { getDataBasePhotos } from "@/features/gallery/services/getDataBasePhotos";

export async function Gallery() {
  const photosFromDb = await getDataBasePhotos();
  const data = await getMe();

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          {data?.role === "ADMIN" && <UploadButton />}
        </div>
      </div>
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
