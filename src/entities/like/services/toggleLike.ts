"use server";

import { left, right, Either } from "@/shared/lib/either";
import { like } from "../repositories/like";
import { CreateLikeResponse } from "../domain";

export async function toggleLike(
  userId: string,
  postId: string,
): Promise<Either<string, CreateLikeResponse>> {
  try {
    const existing = await like.findByUserAndPost(userId, postId);

    if (!existing) {
      const newLike = await like.create(userId, postId);
      return right({ like: newLike, isLiked: true });
    }

    await like.delete(userId, postId);
    return right({ like: existing, isLiked: false });
  } catch (err) {
    console.error("LikeService.toggleLike error:", err);
    return left("UNKNOWN");
  }
}
