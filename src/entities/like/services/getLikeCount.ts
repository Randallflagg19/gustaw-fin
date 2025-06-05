"use server";

import { like } from "../repositories/like";

export async function getLikeCount(postId: string): Promise<number> {
  return like.countByPost(postId);
}
