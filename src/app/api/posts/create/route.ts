// app/api/posts/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/db";

export async function POST(req: Request) {
  console.log("📥 POST /api/posts/create вызван");
  const body = await req.json();

  const { secure_url, resource_type } = body;

  try {
    const post = await prisma.post.create({
      data: {
        mediaUrl: secure_url,
        mediaType: resource_type === "video" ? "VIDEO" : "IMAGE",
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error("❌ Ошибка при создании поста:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
