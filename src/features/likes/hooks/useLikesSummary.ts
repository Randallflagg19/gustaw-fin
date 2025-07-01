import { useEffect } from "react";
import useLikesStore, { LikeInfo } from "@/entities/like/model/likes-store";
import { PostResult } from "@/features/gallery/services/getDataBasePhotosPage";

async function fetchLikesSummary(
  photoIds: string[],
  userId: string | undefined,
) {
  try {
    const response = await fetch("/api/likes/photosSummary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoIds, userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<Record<string, LikeInfo>>;
  } catch (error) {
    console.error("Error fetching likes summary:", error);
    return null; // Return null instead of empty object to indicate error
  }
}

export function useLikesSummary(
  images: PostResult[],
  userId: string | undefined,
) {
  const { setLikesBatch, initializeLike } = useLikesStore();

  useEffect(() => {
    const photoIds = images.map((img) => img.publicId);
    let isMounted = true;

    // Initialize all images with their initial like counts in a batch
    const initializeBatch = async () => {
      const batch: Record<string, LikeInfo> = {};
      const timestamp = Date.now();

      // First set initial state for all images
      images.forEach((img) => {
        batch[img.publicId] = {
          count: img.likesCount,
          isLiked: false,
          timestamp
        };
      });

      if (isMounted) {
        setLikesBatch(batch);
      }

      // Then fetch actual like status for logged-in users
      if (userId) {
        try {
          const likesSummary = await fetchLikesSummary(photoIds, userId);
          if (isMounted && likesSummary) {
            setLikesBatch(likesSummary);
          }
        } catch (err) {
          console.error("Error fetching likes summary:", err);
          // Keep the initial state on error
        }
      }
    };

    initializeBatch();

    return () => {
      isMounted = false;
    };
  }, [images, userId, setLikesBatch, initializeLike]);
}
