"use server";

import { like } from "../repositories/like";

export async function hasUserLiked(
  userId: string,
  postId: string,
): Promise<boolean> {
  const existing = await like.findByUserAndPost(userId, postId);
  return !!existing;
}
