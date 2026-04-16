import React from "react";
import {
  getDataBasePhotosPage,
  PostResult,
} from "@/features/gallery/services/getDataBasePhotosPage";
import { UploadWrapper } from "@/features/gallery/containers/upload-wrapper";
import { InfiniteGallery } from "@/features/gallery/containers/infinite-gallery";

export const dynamic = "force-dynamic";

export async function Gallery() {
  const initialPhotos: PostResult[] = await getDataBasePhotosPage({
    page: 1,
    pageSize: 9,
  });

  return (
    <section className="w-full pb-8">
      <UploadWrapper />

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-6 sm:mb-8">
          <h2
            className="text-3xl leading-[1.08] text-white sm:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Галерея Густава
          </h2>
        </div>

        <div className="rounded-[2rem] border border-[#b88d4f]/40 bg-black/25 p-3 shadow-[0_0_40px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-5">
          <InfiniteGallery initialImages={initialPhotos} />
        </div>
      </div>
    </section>
  );
}
