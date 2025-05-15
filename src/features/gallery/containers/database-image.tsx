"use client";

import { FullHeart } from "@/shared/ui/icons/full-heart";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { useState, useTransition } from "react";
import { PostResult } from "@/features/gallery/services/getDataBasePhotos";

type DatabaseImageProps = {
  imageData: PostResult;
  onLike?: (image: PostResult) => void;
};

export function DatabaseImage({ imageData, onLike }: DatabaseImageProps) {
  const [, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState<boolean>(false); // ← можешь заменить на реальный стейт позже

  return (
    <div className="relative">
      <img
        src={imageData.mediaUrl || ""}
        alt={imageData.title || "Photo"}
        className="w-full h-auto object-cover block rounded-lg"
      />
      {isFavorite ? (
        <FullHeart
          onClick={() => {
            onLike?.(imageData);
            setIsFavorite(false);
            startTransition(() => {
              // await toggleFavoriteAction(imageData.id, false)
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer z-10"
        />
      ) : (
        <EmptyHeart
          onClick={() => {
            setIsFavorite(true);
            startTransition(() => {
              // await toggleFavoriteAction(imageData.id, true)
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer z-10"
        />
      )}
      {/* Можешь добавить меню если нужно */}
    </div>
  );
}
