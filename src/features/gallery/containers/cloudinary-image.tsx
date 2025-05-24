"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import { useEffect, useState, useTransition } from "react";
import { setAsFavoriteAction } from "@/features/gallery/actions/toggleLikeActions";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import { ImageMenu } from "@/features/gallery/containers/image-menu";
import { createLikeAction } from "@/features/gallery/actions/toggleDBLikeActions";
import useUserStore from "@/entities/user/model/user-store";

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

  const { user } = useUserStore();

  const toggleFavorite = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite); // можно оставить для мгновенного отклика
    onLike?.(imageData, newFavorite);

    if (user.id) {
      createLikeAction(user.id, imageData.public_id)
        .then((result) => {
          if (typeof result === "object") {
            if (result.type === "right") {
              startTransition(() => {
                console.log(
                  "Toggle like for post ID:",
                  imageData.public_id,
                  "New like state:",
                  newFavorite,
                );
                setAsFavoriteAction(imageData.public_id, newFavorite);
              });
            } else {
              // Откатить изменение при ошибке
              setIsFavorite(!newFavorite);
              onLike?.(imageData, !newFavorite);
              console.error("Ошибка при создании лайка:", result.error);
            }
          }
        })
        .catch(() => {
          // Обработка ошибок сети или других ошибок
          setIsFavorite(!newFavorite);
          onLike?.(imageData, !newFavorite);
          console.error("Ошибка с сервером");
        });
    } else {
      console.warn("Пользователь не авторизован");
      // Можно оставить состояние как есть или откатить
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
