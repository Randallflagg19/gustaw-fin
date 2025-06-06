// src/app/api/photos/route.ts

import { NextResponse } from "next/server";
import { getDataBasePhotos } from "@/features/gallery/services/getDataBasePhotos";

// Запрос для получения данных
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1"; // По умолчанию страница 1
  console.log(page);
  const photos = await getDataBasePhotos(); // Логика пагинации
  return NextResponse.json(photos);
}
