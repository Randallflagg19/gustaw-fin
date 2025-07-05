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
  // Оптимизированный запрос с использованием новых индексов
  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      mediaType: "IMAGE", // Используется индекс idx_posts_media_type
      mediaUrl: {
        not: null, // Исключаем посты без изображений
      },
    },
    orderBy: {
      createdAt: "desc", // Используется индекс idx_posts_media_type_created_at
    },
    select: {
      id: true,
      mediaUrl: true,
      publicId: true,
      createdAt: true,
      // Оптимизированный подсчет лайков и комментариев
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  return posts.map((post) => ({
    id: post.id,
    mediaUrl: post.mediaUrl ?? "",
    publicId: post.publicId ?? "",
    createdAt: post.createdAt,
    likesCount: post._count.likes,
    commentCount: post._count.comments,
  }));
}
