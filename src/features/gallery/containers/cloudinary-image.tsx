"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import React, { useEffect, useState } from "react";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import useUserStore from "@/entities/user/model/user-store";
import useLikesStore from "@/entities/like/model/likes-store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

  const zustandUser = useUserStore((s) => s.user);
  const { data: session } = useSession();
  const nextAuthUser = session?.user;
  const user = nextAuthUser || zustandUser;

  const likeInfoFromStore = useLikesStore(
    (store) => store.likes[imageData.publicId],
  );
  const likeInfo = likeInfoFromStore ?? {
    count: imageData.likesCount,
    isLiked: false,
  };
  const toggleLike = useLikesStore((s) => s.toggleLike);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [imageData.publicId]);

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
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[24px] bg-zinc-900/70">
        <p className="text-zinc-400">Изображение недоступно</p>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-[#b88d4f]/25 bg-[#120d0a] shadow-[0_18px_50px_rgba(0,0,0,0.30)]">
      {isLoading && (
        <div className="absolute inset-0 z-20 animate-pulse bg-zinc-800/70" />
      )}

      <div className="relative aspect-[4/5] overflow-hidden bg-[#120d0a]">
        <CldImage
          {...rest}
          src={imageData.publicId}
          alt="Фото Густава"
          className="h-full w-full object-contain transition duration-300"
          onLoad={handleLoad}
          onError={handleError}
        />

        <div className="absolute left-3 top-3 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-sm">
          <button
            type="button"
            onClick={handleLikeClick}
            disabled={isLikeProcessing}
            className={`text-white transition hover:scale-110 ${
              isLikeProcessing ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {likeInfo.isLiked ? (
              <FullHeart className="text-red-500 hover:text-red-400" />
            ) : (
              <EmptyHeart className="hover:text-red-400" />
            )}
          </button>

          <span className="text-sm font-semibold tracking-wide text-white [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)]">
            {likeInfo.count}
          </span>
        </div>
      </div>
    </div>
  );
}
