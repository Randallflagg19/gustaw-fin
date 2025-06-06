// app/api/likes/batch-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { like } from "@/entities/like/repositories/like";
import { getLikeCount } from "@/entities/like/services/getLikeCount";

export async function POST(request: NextRequest) {
  try {
    const { photoIds, userId } = (await request.json()) as {
      photoIds: string[];
      userId?: string;
    };

    if (!Array.isArray(photoIds)) {
      return NextResponse.json(
        { error: "photoIds must be an array" },
        { status: 400 },
      );
    }

    // Собираем count для каждого photoId
    // Предполагаем, что getLikeCount(photoId) возвращает Promise<number>
    const countsPromises = photoIds.map((pid) => getLikeCount(pid));

    // Собираем статусы “isLiked” (поиск “findByUserAndPost” для каждого)
    let statusesPromises: Promise<boolean>[] = [];
    if (userId) {
      statusesPromises = photoIds.map(async (pid) => {
        const existing = await like.findByUserAndPost(userId, pid);
        return !!existing;
      });
    } else {
      // Если нет userId (неавторизованный), сразу считаем isLiked = false для всех
      statusesPromises = photoIds.map(() => Promise.resolve(false));
    }

    const countsArr = await Promise.all(countsPromises);
    const statusesArr = await Promise.all(statusesPromises);

    // Собираем объект вида { [photoId]: { count, isLiked } }
    const result: Record<string, { count: number; isLiked: boolean }> = {};
    photoIds.forEach((pid, idx) => {
      result[pid] = { count: countsArr[idx], isLiked: statusesArr[idx] };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Ошибка в POST /api/likes/batch-status:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
