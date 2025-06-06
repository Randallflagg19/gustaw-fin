import { NextRequest, NextResponse } from "next/server";
import { like } from "@/entities/like/repositories/like"; // предположим, ваш репозиторий

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId");
  const photoId = searchParams.get("photoId");

  if (!userId || !photoId) {
    return NextResponse.json(
      { error: "Missing userId or photoId" },
      { status: 400 },
    );
  }

  try {
    const existing = await like.findByUserAndPost(userId, photoId);
    // Если записи нет — значит пользователь не лайкал
    const isLiked = !!existing;
    return NextResponse.json({ isLiked });
  } catch (err) {
    console.error("Error in GET /api/likes/status:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
