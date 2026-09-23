"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { EmptyHeart } from "@/shared/ui/icons/empty-heart";
import { FullHeart } from "@/shared/ui/icons/full-heart";
import React, { useState } from "react";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import useUserStore from "@/entities/user/model/user-store";
import useLikesStore from "@/entities/like/model/likes-store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { likeCountFont } from "@/shared/ui/typography";

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

  const [hasError, setHasError] = useState(false);
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image ${imageData.publicId}`);
    setHasError(true);
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
      <div className="flex min-h-48 w-full items-center justify-center rounded-[24px] bg-zinc-900/70">
        <p className="text-zinc-400">Изображение недоступно</p>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-[#b88d4f]/25 bg-[#120d0a] shadow-[0_18px_50px_rgba(0,0,0,0.30)]">
      <div className="relative overflow-hidden bg-[#120d0a]">
        <CldImage
          {...rest}
          src={imageData.publicId}
          alt="Фото Густава"
          className="block h-auto w-full"
          onError={handleError}
        />

        <div
          className={`absolute left-3 top-3 z-30 flex items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 ${
            likeInfo.isLiked
              ? "border-[#FFAD6B]/30 bg-black/45 shadow-[0_0_18px_rgba(255,173,107,0.18)]"
              : "border-[#F4E9D2]/15 bg-black/35"
          }`}
        >
          <button
            type="button"
            onClick={handleLikeClick}
            disabled={isLikeProcessing}
            aria-label={
              likeInfo.isLiked
                ? "Убрать отметку нравится"
                : "Отметить как понравившееся"
            }
            aria-pressed={likeInfo.isLiked}
            className={`transition-transform duration-150 ease-out hover:scale-110 active:scale-90 motion-reduce:transform-none ${
              likeInfo.isLiked ? "text-[#FFAD6B]" : "text-[#F4E9D2]"
            } ${isLikeProcessing ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {likeInfo.isLiked ? <FullHeart /> : <EmptyHeart />}
          </button>

          <span
            className={`${likeCountFont.className} text-sm tracking-wide [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)] ${
              likeInfo.isLiked ? "text-[#FFAD6B]" : "text-[#F4E9D2]"
            }`}
          >
            {likeInfo.count}
          </span>
        </div>
      </div>
    </div>
  );
}
