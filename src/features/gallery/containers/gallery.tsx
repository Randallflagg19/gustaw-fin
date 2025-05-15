import { UploadButton } from "@/features/gallery/containers/upload-button";
import { getDataBasePhotos } from "@/features/gallery/services/getDataBasePhotos";
import React from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";
import { getMe } from "@/entities/user/services/get-me";

export async function Gallery() {
  const results = await getDataBasePhotos();

  const data = await getMe();

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          {data?.role === "ADMIN" && <UploadButton />}
        </div>
      </div>
      <GalleryGrid images={results} />
    </section>
  );
}
