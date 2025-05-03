"use client";

import { CldImage } from "next-cloudinary";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CloudinaryImage(props: any) {
  return <CldImage {...props} />;
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
