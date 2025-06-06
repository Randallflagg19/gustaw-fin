"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import React, { useState, useEffect } from "react";
import { SearchResult } from "@/features/gallery/services/getCloudinaryPhotos";
import useUserStore from "@/entities/user/model/user-store";
import useLikesStore, { LikeInfo } from "@/entities/like/model/likes-store";
import { redirect } from "next/navigation";

type CloudinaryImageProps = Omit<CldImageProps, "src"> & {
  imageData: SearchResult;
  onLike?: (image: SearchResult, liked: boolean) => void;
};

// Вынесли дефолтный объект наружу, чтобы ссылка была стабильна
const DEFAULT_LIKE_INFO: LikeInfo = { count: 0, isLiked: false };

export function CloudinaryImage({
  imageData,
  onLike,
  ...rest
}: CloudinaryImageProps) {
  const user = useUserStore((store) => store.user);

  const likeInfo = useLikesStore(
    (store) => store.likes[imageData.public_id] ?? DEFAULT_LIKE_INFO,
  );

  const toggleLike = useLikesStore((s) => s.toggleLike);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки данных
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 секунда для примера

    return () => clearTimeout(timeout); // Очистка таймера, если компонент размонтирован
  }, []);

  const toggleFavorite = () => {
    if (!user) {
      redirect("/sign-in");
    }
    // Запускаем асинхронный экшн стора
    toggleLike(imageData.public_id, user.id);
    onLike?.(imageData, !likeInfo.isLiked);
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
            src={imageData.public_id}
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
