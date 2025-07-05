// app/api/photos/route.ts
import { NextResponse } from "next/server";
import { getDataBasePhotosPage } from "@/features/gallery/services/getDataBasePhotosPage";
import { cache } from "@/shared/lib/redis";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "9");

  // Проверяем кэш
  const cacheKey = cache.keys.photosPage(page, pageSize);
  const cachedPhotos = await cache.get(cacheKey);

  if (cachedPhotos) {
    return NextResponse.json(cachedPhotos);
  }

  // Получаем из БД
  const photos = await getDataBasePhotosPage({ page, pageSize });

  // Кэшируем на 2 минуты (фото обновляются реже)
  await cache.set(cacheKey, photos, 120);

  return NextResponse.json(photos);
}
