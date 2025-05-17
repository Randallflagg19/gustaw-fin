import { UploadButton } from "@/features/gallery/containers/upload-button";
import React from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";
import { getMe } from "@/entities/user/services/get-me";
import { getCloudinaryPhotos } from "@/features/gallery/services/getCloudinaryPhotos";

export async function Gallery() {
  const photosFromCloud = await getCloudinaryPhotos();

  const data = await getMe();

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          {data?.role === "ADMIN" && <UploadButton />}
        </div>
      </div>
      {/* тут сетка фоток: компонент сетки и внутри массив*/}
      <GalleryGrid images={photosFromCloud} />
    </section>
  );
}
