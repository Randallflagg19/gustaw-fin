import { left, right, Either } from "@/shared/lib/either";
import { likeRepository } from "../repositories/likeRepository";
import { LikeEntity, CreateLikeResponse } from "../domain";

export type ToggleLikeError = "UNKNOWN" | "NOT_AUTHORIZED";

export type ToggleLikeResult = CreateLikeResponse & { isLiked: boolean };

export async function toggleLike(
  userId: string,
  postId: string,
): Promise<Either<ToggleLikeError, ToggleLikeResult>> {
  try {
    const existing = await likeRepository.findByUserAndPost(userId, postId);

    if (!existing) {
      const newLike = await likeRepository.create(userId, postId);
      return right({ like: newLike, isLiked: true });
    }

    await likeRepository.delete(userId, postId);
    return right({ like: existing, isLiked: false });
  } catch (err) {
    console.error("LikeService.toggleLike error:", err);
    return left("UNKNOWN");
  }
}

export async function hasUserLiked(userId: string | null, postId: string): Promise<boolean> {
  if (!userId) return false;
  const like = await likeRepository.findByUserAndPost(userId, postId);
  return !!like;
}

export async function getLikeCount(postId: string): Promise<number> {
  return likeRepository.countByPost(postId);
}

export async function getLikeCountsForPosts(
  postIds: string[],
): Promise<{ postId: string; count: number }[]> {
  const mapCounts = await likeRepository.countGroupedByPosts(postIds);
  return postIds.map((id) => ({ postId: id, count: mapCounts[id] || 0 }));
}
