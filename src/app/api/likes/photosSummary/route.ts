import { NextRequest, NextResponse } from "next/server";
import { like } from "@/entities/like/repositories/like";
import { getLikeCount } from "@/entities/like/services/getLikeCount";

export async function POST(request: NextRequest) {
  try {
    const { photoIds, userId } = await request.json();

    const results = await Promise.all(
      photoIds.map(async (photoId: string) => {
        const count = await getLikeCount(photoId);
        const isLiked = userId
          ? Boolean(await like.findByUserAndPost(userId, photoId))
          : false;
        return [photoId, { count, isLiked }] as const;
      }),
    );

    return NextResponse.json(Object.fromEntries(results));
  } catch (err) {
    console.error("Ошибка в POST /api/likes/photosSummary:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
