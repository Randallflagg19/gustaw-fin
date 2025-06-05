"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import { useEffect, useState } from "react";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import { ImageMenu } from "@/features/gallery/containers/image-menu";
import useUserStore from "@/entities/user/model/user-store";
import { toggleLike } from "@/entities/like/services/toggleLike";
import { getLikeCount } from "@/entities/like/services/getLikeCount";

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

  // Синхронизируем локальный стейт с тегами при изменении imageData
  useEffect(() => {
    setIsFavorite(imageData.tags.includes("favorite"));
  }, [imageData.tags]);

  const { user } = useUserStore();

  const toggleFavorite = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    onLike?.(imageData, newFavorite);

    if (user.id) {
      toggleLike(user.id, imageData.public_id);

      getLikeCount(imageData.public_id).then((res) => console.log(res));
    } else {
      console.warn("Пользователь не авторизован");
    }
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
