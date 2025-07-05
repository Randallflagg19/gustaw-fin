"use server";

import { prisma } from "@/shared/lib/db";
import { cache } from "@/shared/lib/redis";

export async function getLikeCount(postId: string): Promise<number> {
  const cacheKey = cache.keys.likeCount(postId);

  // Пытаемся получить из кэша
  const cachedCount = await cache.get<number>(cacheKey);
  if (cachedCount !== null) {
    return cachedCount;
  }

  // Если нет в кэше, получаем из БД
  const count = await prisma.like.count({
    where: { postId },
  });

  // Сохраняем в кэш на 5 минут
  await cache.set(cacheKey, count, 300);

  return count;
}
