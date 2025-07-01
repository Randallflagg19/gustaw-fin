import { create } from "zustand";
import { getLikeCount } from "@/entities/like/services/getLikeCount";
import { toggleLike } from "@/entities/like/services/toggleLike";
import { hasUserLiked } from "@/entities/like/services/hasUserLiked";

export interface LikeInfo {
  count: number;
  isLiked: boolean;
  timestamp?: number;
}

export interface LikesStore {
  likes: Record<string, LikeInfo>;
  isLoaded: boolean;
  setLikesBatch: (batch: Record<string, LikeInfo>) => void;
  toggleLike: (photoId: string, userId: string) => Promise<void>;
  initializeLike: (photoId: string, count: number, userId?: string) => Promise<void>;
}

const useLikesStore = create<LikesStore>((set, get) => ({
  likes: {},
  isLoaded: false,

  setLikesBatch: (batch) => {
    const timestamp = Date.now();
    set({
      likes: Object.entries(batch).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: { ...value, timestamp }
      }), {}),
      isLoaded: true
    });
  },

  initializeLike: async (photoId: string, count: number, userId?: string) => {
    const store = get();
    const currentLike = store.likes[photoId];

    // Skip if we have fresh data (less than 1 minute old)
    if (currentLike?.timestamp && Date.now() - currentLike.timestamp < 60000) {
      return;
    }

    // If no userId, just initialize with count and isLiked: false
    if (!userId) {
      set((s) => ({
        likes: {
          ...s.likes,
          [photoId]: { count, isLiked: false, timestamp: Date.now() }
        }
      }));
      return;
    }

    try {
      const isLiked = await hasUserLiked(userId, photoId);
      set((s) => ({
        likes: {
          ...s.likes,
          [photoId]: { count, isLiked, timestamp: Date.now() }
        }
      }));
    } catch (err) {
      console.error("Error initializing like:", err);
      // Keep existing data if available, otherwise initialize with defaults
      set((s) => ({
        likes: {
          ...s.likes,
          [photoId]: currentLike || { count, isLiked: false, timestamp: Date.now() }
        }
      }));
    }
  },

  toggleLike: async (photoId: string, userId: string) => {
    const store = get();
    const prev = store.likes[photoId];

    // If we don't have previous data, initialize it first
    if (!prev) {
      try {
        const [count, isLiked] = await Promise.all([
          getLikeCount(photoId),
          hasUserLiked(userId, photoId)
        ]);

        set((s) => ({
          likes: {
            ...s.likes,
            [photoId]: { count, isLiked, timestamp: Date.now() }
          }
        }));

        // If already in desired state, don't toggle
        if (isLiked) return;
      } catch (err) {
        console.error("Error initializing like data:", err);
        return; // Don't proceed with toggle if we can't get initial state
      }
    }

    const currentState = store.likes[photoId];
    const newIsLiked = !currentState.isLiked;
    const optimisticCount = currentState.count + (newIsLiked ? 1 : -1);

    // Optimistic update
    set((s) => ({
      likes: {
        ...s.likes,
        [photoId]: {
          count: optimisticCount,
          isLiked: newIsLiked,
          timestamp: Date.now()
        }
      }
    }));

    try {
      await toggleLike(userId, photoId);
      const updatedCount = await getLikeCount(photoId);

      set((s) => ({
        likes: {
          ...s.likes,
          [photoId]: {
            count: updatedCount,
            isLiked: newIsLiked,
            timestamp: Date.now()
          }
        }
      }));
    } catch (err) {
      console.error("Error in toggleLike:", err);
      // Revert to previous state on error
      set((s) => ({
        likes: {
          ...s.likes,
          [photoId]: currentState
        }
      }));
    }
  },
}));

export default useLikesStore;
