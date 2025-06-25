// features/gallery/containers/infinite-gallery.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import { useLikesSummary } from "@/features/likes/hooks/useLikesSummary";
import useUserStore from "@/entities/user/model/user-store";

interface InfiniteGalleryProps {
  initialImages: PostResult[];
}

export function InfiniteGallery({ initialImages }: InfiniteGalleryProps) {
  const [images, setImages] = useState<PostResult[]>(initialImages);
  const [page, setPage] = useState(2); // потому что 1-ю страницу мы уже загрузили на сервере
  const [hasMore, setHasMore] = useState(initialImages.length === 9);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const pageSize = 9;

  // Получаем текущего пользователя из zustand
  const user = useUserStore((s) => s.user);

  // 1) Вызов хука для подгрузки лайков (на верхнем уровне компонента!)
  useLikesSummary(images, user?.id);

  // 2) Эффект: когда меняется page, загружаем новые 9 фото
  useEffect(() => {
    // Если нет новых страниц — не грузим
    if (!hasMore) return;

    const loadMorePhotos = async () => {
      try {
        const res = await fetch(
          `/api/photos?page=${page}&pageSize=${pageSize}`,
        );
        if (!res.ok) throw new Error("Ошибка при загрузке фотографий");

        const newPhotos: PostResult[] = await res.json();

        setImages((prev) => {
          // Фильтруем дубли по id (чтобы ключи оставались уникальными)
          const existingIds = new Set(prev.map((img) => img.id));
          const filtered = newPhotos.filter(
            (photo) => !existingIds.has(photo.id),
          );
          return [...prev, ...filtered];
        });

        // Если пришло меньше pageSize → страниц больше нет
        if (newPhotos.length < pageSize) setHasMore(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setHasMore(false);
      }
    };

    loadMorePhotos();
  }, [page, hasMore]);

  // 3) IntersectionObserver: когда <div ref={loaderRef} /> пересекает экран, увеличиваем page
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "200px", // подгружает чуть раньше, когда "200px" до конца
      },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="flex flex-col w-full gap-y-4">
      <GalleryGrid images={images} />
      {hasMore && <div ref={loaderRef} className="h-8" />}
    </div>
  );
}
