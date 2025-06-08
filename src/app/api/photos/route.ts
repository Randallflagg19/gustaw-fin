// app/api/photos/route.ts
import { NextResponse } from "next/server";
import { getDataBasePhotosPage } from "@/features/gallery/services/getDataBasePhotosPage";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "9");

  const photos = await getDataBasePhotosPage({ page, pageSize });
  return NextResponse.json(photos);
}
