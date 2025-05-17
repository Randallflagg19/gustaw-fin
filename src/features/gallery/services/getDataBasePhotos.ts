import { prisma } from "@/shared/lib/db";

export type PostResult = {
  id: string;
  title?: string | null;
  content?: string | null;
  mediaUrl?: string | null;
  mediaType?: "IMAGE" | "VIDEO" | "STORY" | null;
  createdAt: Date;
};

export async function getDataBasePhotos(): Promise<PostResult[]> {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      content: true,
      mediaUrl: true,
      mediaType: true,
      createdAt: true,
    },
  });
}
