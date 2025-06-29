"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import React, { useState, useEffect } from "react";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import useUserStore from "@/entities/user/model/user-store";
import useLikesStore from "@/entities/like/model/likes-store";
import { redirect } from "next/navigation";

type CloudinaryImageProps = Omit<CldImageProps, "src"> & {
  imageData: PostResult;
  onLike?: (image: PostResult, liked: boolean) => void;
};

export function CloudinaryImage({
  imageData,
  onLike,
  ...rest
}: CloudinaryImageProps) {
  const user = useUserStore((store) => store.user);

  const likeInfoFromStore = useLikesStore((store) => store.likes[imageData.publicId]);
  const likeInfo = likeInfoFromStore && likeInfoFromStore.count > 0
    ? likeInfoFromStore
    : { count: imageData.likesCount, isLiked: false };

  const toggleLike = useLikesStore((s) => s.toggleLike);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки данных
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 секунда для примера

    return () => clearTimeout(timeout); // Очистка таймера, если компонент размонтирован
  }, []);

  // Изменим onLike, чтобы синхронизировать статус загрузки
  const toggleFavorite = () => {
    if (!user) {
      redirect("/sign-in");
      return; // Прерываем выполнение, если пользователь не авторизован
    }

    // Если лайк ставится, сразу меняем состояние загрузки
    setIsLoading(true);
    toggleLike(imageData.publicId, user.id);

    onLike?.(imageData, !likeInfo.isLiked);

    // Эмулируем завершение загрузки лайка
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {/* Скелетон */}
      {isLoading ? (
        <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg"></div>
      ) : (
        <>
          <CldImage
            {...rest}
            src={imageData.publicId}
            className="w-full h-auto object-cover block rounded-lg"
          />

          {likeInfo.isLiked ? (
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

          <div className="absolute top-2 left-9 text-white font-medium z-10">
            {likeInfo.count}
          </div>
        </>
      )}
    </div>
  );
}
