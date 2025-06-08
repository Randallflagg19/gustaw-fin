// features/gallery/ui/gallery.tsx
import React from "react";
import {
  getDataBasePhotosPage,
  PostResult,
} from "@/features/gallery/services/getDataBasePhotosPage";
import { UploadWrapper } from "@/features/gallery/containers/upload-wrapper";
import { InfiniteGallery } from "@/features/gallery/containers/infinite-gallery";

export const dynamic = "force-dynamic";

export default async function Gallery() {
  // На сервере сразу забираем первые 9 фото
  const initialPhotos: PostResult[] = await getDataBasePhotosPage({
    page: 1,
    pageSize: 9,
  });

  return (
    <section className="w-full">
      <UploadWrapper />
      {/* Передаём первые 9 фото в клиентский InfiniteGallery */}
      <InfiniteGallery initialImages={initialPhotos} />
    </section>
  );
}
