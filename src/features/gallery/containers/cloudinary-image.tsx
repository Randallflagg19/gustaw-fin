"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import { useTransition } from "react";
import { setAsFavoriteAction } from "@/features/gallery/actions";
import type { SearchResult } from "@/features/gallery/containers/gallery";

// Добавим типизацию: все пропсы CldImage (кроме src) + наше imageData
type CloudinaryImageProps = Omit<CldImageProps, "src"> & {
  imageData: SearchResult;
};

export function CloudinaryImage({ imageData, ...rest }: CloudinaryImageProps) {
  const [, startTransition] = useTransition();
  const isFavorite = imageData.tags.includes("favorite");

  return (
    <div className="relative">
      <CldImage
        {...rest}
        src={imageData.public_id}
        className="w-full h-auto object-cover block"
      />
      {isFavorite ? (
        <FullHeart
          onClick={() =>
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false);
            })
          }
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer z-10"
        />
      ) : (
        <EmptyHeart
          onClick={() =>
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true);
            })
          }
          className="absolute top-2 right-2 hover:text-red-500 cursor-pointer z-10"
        />
      )}
    </div>
  );
}

// "use client";
//
// import { CldImage } from "next-cloudinary";
// import { Heart } from "@/shared/ui/icons/heart";
// import { FullHeart } from "@/shared/ui/icons/full-heart";
// import { useState, useTransition } from "react";
// import { setAsFavoriteAction } from "@/features/gallery/actions";
// import { SearchResult } from "@/features/gallery/containers/gallery";
//
// export function CloudinaryImage(props: any & { imageData: SearchResult }) {
//   const [transition, startTransition] = useTransition();
//
//   const { imageData } = props;
//
//   const isFavorited = imageData.tags.includes("favorite");
//   return (
//     <div className="relative">
//       <CldImage {...props} src={imageData.public_id} />
//
//       {isFavorited ? (
//         <FullHeart
//           onClick={() => {
//             startTransition(() => {
//               setAsFavoriteAction(imageData.public_id, false);
//             });
//           }}
//           className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
//         />
//       ) : (
//         <Heart
//           onClick={() => {
//             startTransition(() => {
//               setAsFavoriteAction(imageData.public_id, true);
//             });
//           }}
//           className="absolute top-2 right-2 hover:text-red-500 cursor-pointer"
//         />
//       )}
//     </div>
//   );
// }
