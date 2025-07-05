"use server";

import { left, right, Either } from "@/shared/lib/either";
import { prisma } from "@/shared/lib/db";
import { cache } from "@/shared/lib/redis";
import { CreateLikeResponse } from "../domain";

export async function toggleLike(
  userId: string,
  postId: string,
): Promise<Either<string, CreateLikeResponse>> {
  try {
    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    let result: CreateLikeResponse;

    if (!existing) {
      // Создаем лайк
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      result = { like: newLike, isLiked: true };
    } else {
      // Удаляем лайк
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      result = { like: existing, isLiked: false };
    }

    // Инвалидируем кэш
    await Promise.all([
      cache.del(cache.keys.likeCount(postId)),
      cache.del(cache.keys.userLiked(userId, postId)),
      cache.invalidatePattern(`photos_summary:*`), // Инвалидируем все сводки фото
    ]);

    return right(result);
  } catch (err) {
    console.error("LikeService.toggleLike error:", err);
    return left("UNKNOWN");
  }
}
