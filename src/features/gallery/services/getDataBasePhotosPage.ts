// features/gallery/services/getDataBasePhotosPage.ts
import { prisma } from "@/shared/lib/db";

export type PostResult = {
  id: string;
  mediaUrl: string;
  publicId: string;
  createdAt: Date;
  likesCount: number;
  commentCount: number;
};

export async function getDataBasePhotosPage({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<PostResult[]> {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      mediaType: "IMAGE",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likes: true,
      comments: true,
    },
  });

  return posts.map((post) => ({
    id: post.id,
    mediaUrl: post.mediaUrl ?? "",
    publicId: post.publicId ?? "",
    createdAt: post.createdAt,
    likesCount: post.likes.length,
    commentCount: post.comments.length,
  }));
}
