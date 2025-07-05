"use server";

import { prisma } from "@/shared/lib/db";
import { cache } from "@/shared/lib/redis";

export async function hasUserLiked(
  userId: string,
  postId: string,
): Promise<boolean> {
  const cacheKey = cache.keys.userLiked(userId, postId);

  // Пытаемся получить из кэша
  const cachedResult = await cache.get<boolean>(cacheKey);
  if (cachedResult !== null) {
    return cachedResult;
  }

  // Если нет в кэше, получаем из БД
  const like = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  const hasLiked = !!like;

  // Сохраняем в кэш на 5 минут
  await cache.set(cacheKey, hasLiked, 300);

  return hasLiked;
}
