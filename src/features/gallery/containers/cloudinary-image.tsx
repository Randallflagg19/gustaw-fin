"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import React, { useState, useEffect } from "react";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import useUserStore from "@/entities/user/model/user-store";
import useLikesStore from "@/entities/like/model/likes-store";
import { useRouter } from "next/navigation";

type CloudinaryImageProps = Omit<CldImageProps, "src"> & {
  imageData: PostResult;
  onLike?: (image: PostResult, liked: boolean) => void;
};

export function CloudinaryImage({
  imageData,
  onLike,
  ...rest
}: CloudinaryImageProps) {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const likeInfoFromStore = useLikesStore((store) => store.likes[imageData.publicId]);
  const likeInfo = likeInfoFromStore ?? { count: imageData.likesCount, isLiked: false };
  const toggleLike = useLikesStore((s) => s.toggleLike);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [imageData.publicId, isLoading]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    console.error(`Failed to load image ${imageData.publicId}`);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLikeClick = async () => {
    if (!user) {
      router.push("/sign-up");
      return;
    }

    if (isLikeProcessing) return;

    setIsLikeProcessing(true);
    try {
      await toggleLike(imageData.publicId, user.id);
      onLike?.(imageData, !likeInfo.isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLikeProcessing(false);
    }
  };

  if (hasError) {
    return (
      <div className="relative w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Изображение недоступно</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}

      <div className="relative">
        <CldImage
          {...rest}
          src={imageData.publicId}
          className="w-full h-auto object-cover block rounded-lg"
          onLoad={handleLoad}
          onError={handleError}
          alt=""
        />


        <div className="absolute top-2 left-2 flex items-center gap-2">
          <button
            onClick={handleLikeClick}
            disabled={isLikeProcessing}
            className={`text-white hover:scale-110 transition-transform ${isLikeProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {likeInfo.isLiked ? (
              <FullHeart className="text-red-500 hover:text-red-600" />
            ) : (
              <EmptyHeart className="hover:text-red-500" />
            )}
          </button>
          <span className="font-[var(--font-orbitron)] text-white text-sm tracking-wider font-bold [text-shadow:_0_0_5px_rgba(255,255,255,0.5),_0_1px_2px_rgb(0_0_0_/_0.8)]">
            {likeInfo.count}
          </span>
        </div>

      </div>
    </div>
  );
}
