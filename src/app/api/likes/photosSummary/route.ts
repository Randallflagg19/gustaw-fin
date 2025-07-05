import { NextRequest, NextResponse } from "next/server";
import { getLikeCount } from "@/entities/like/services/getLikeCount";
import { hasUserLiked } from "@/entities/like/services/hasUserLiked";
import { cache } from "@/shared/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const { photoIds, userId } = await request.json();

    // Проверяем кэш
    const cacheKey = cache.keys.photosSummary(photoIds, userId);
    const cachedSummary = await cache.get(cacheKey);

    if (cachedSummary) {
      return NextResponse.json(cachedSummary);
    }

    // Получаем данные из БД (теперь с кэшированием на уровне сервисов)
    const results = await Promise.all(
      photoIds.map(async (photoId: string) => {
        const count = await getLikeCount(photoId);
        const isLiked = userId ? await hasUserLiked(userId, photoId) : false;
        return [photoId, { count, isLiked }] as const;
      }),
    );

    const summary = Object.fromEntries(results);

    // Кэшируем на 2 минуты
    await cache.set(cacheKey, summary, 120);

    return NextResponse.json(summary);
  } catch (err) {
    console.error("Ошибка в POST /api/likes/photosSummary:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
