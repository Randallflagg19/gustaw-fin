"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import { useState, useTransition } from "react";
import { setAsFavoriteAction } from "@/features/gallery/actions/toggleLikeActions";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import { ImageMenu } from "@/features/gallery/containers/image-menu";

type CloudinaryImageProps = Omit<CldImageProps, "src"> & {
  imageData: SearchResult;
  onUnheart?: (unheartedResource: SearchResult) => void;
};

export function CloudinaryImage({
  imageData,
  onUnheart,
  ...rest
}: CloudinaryImageProps) {
  const [, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState<boolean>(
    imageData.tags.includes("favorite"),
  );

  return (
    <div className="relative">
      <CldImage
        {...rest}
        src={imageData.public_id}
        className="w-full h-auto object-cover block  rounded-lg"
      />
      {isFavorite ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavorite(false);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer z-10"
        />
      ) : (
        <EmptyHeart
          onClick={() => {
            setIsFavorite(true);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer z-10"
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  );
}
