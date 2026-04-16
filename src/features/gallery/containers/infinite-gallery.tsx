"use client";

import React, { useEffect, useRef, useState } from "react";
import { GalleryGrid } from "@/features/gallery/ui/gallery-grid";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";
import { useLikesSummary } from "@/features/likes/hooks/useLikesSummary";
import useUserStore from "@/entities/user/model/user-store";
import { useSession } from "next-auth/react";

interface InfiniteGalleryProps {
  initialImages: PostResult[];
}

export function InfiniteGallery({ initialImages }: InfiniteGalleryProps) {
  const [images, setImages] = useState<PostResult[]>(initialImages);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const zustandUser = useUserStore((s) => s.user);
  const { data: session } = useSession();
  const nextAuthUser = session?.user;
  const user = nextAuthUser || zustandUser;

  useLikesSummary(images, user?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          try {
            const response = await fetch(
              `/api/photos?page=${page}&pageSize=9`,
              {
                signal: AbortSignal.timeout(30000),
              },
            );

            const newImages: PostResult[] = await response.json();

            if (newImages.length === 0) {
              setHasMore(false);
            } else {
              setImages((prev) => [...prev, ...newImages]);
              setPage((p) => p + 1);
            }
          } catch (error) {
            console.error("Error fetching more images:", error);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "newUpload") {
        const newImage = JSON.parse(e.newValue || "");
        if (newImage) {
          setImages((prev) => [newImage, ...prev]);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const uniqueImages = React.useMemo(() => {
    const seen = new Set<string>();
    return images.filter((img) => {
      if (seen.has(img.publicId)) return false;
      seen.add(img.publicId);
      return true;
    });
  }, [images]);

  return (
    <>
      <GalleryGrid images={uniqueImages} />
      <div ref={observerTarget} className="h-10" />
      {loading && (
        <div className="py-4 text-center">Loading more images...</div>
      )}
    </>
  );
}
