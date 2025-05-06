import { UploadButton } from "@/features/gallery/containers/upload-button";
import { getCloudinaryPhotos } from "@/features/gallery/services/getCloudinaryPhotos";
import React from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";

export async function Gallery() {
  const results = await getCloudinaryPhotos();

  return (
    <section className="w-full">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center">
          <UploadButton />
        </div>
      </div>
      <GalleryGrid images={results} />
    </section>
  );
}
