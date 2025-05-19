"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import { useEffect, useState, useTransition } from "react";
import { setAsFavoriteAction } from "@/features/gallery/actions/toggleLikeActions";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import { ImageMenu } from "@/features/gallery/containers/image-menu";

type CloudinaryImageProps = Omit<CldImageProps, "src"> & {
  imageData: SearchResult;
  onLike?: (image: SearchResult, liked: boolean) => void; // передаем статус лайка
};

export function CloudinaryImage({
  imageData,
  onLike,
  ...rest
}: CloudinaryImageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [, startTransition] = useTransition();

  // Синхронизируем локальный стейт с тегами при изменении imageData
  useEffect(() => {
    setIsFavorite(imageData.tags.includes("favorite"));
  }, [imageData.tags]);

  const toggleFavorite = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    onLike?.(imageData, newFavorite);

    console.log(
      "Toggle like for post ID:",
      imageData.public_id,
      "New like state:",
      newFavorite,
    );

    console.log("DB ID:", imageData.id);

    startTransition(() => {
      setAsFavoriteAction(imageData.public_id, newFavorite);
    });
  };

  return (
    <div className="relative">
      <CldImage
        {...rest}
        src={imageData.public_id}
        className="w-full h-auto object-cover block rounded-lg"
      />
      {isFavorite ? (
        <FullHeart
          onClick={toggleFavorite}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer z-10"
        />
      ) : (
        <EmptyHeart
          onClick={toggleFavorite}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer z-10"
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  );
}
