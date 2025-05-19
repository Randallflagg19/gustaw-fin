import { prisma } from "@/shared/lib/db";

export async function getDataBasePhotos() {
  const posts = await prisma.post.findMany({
    where: {
      mediaType: "IMAGE",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likes: true, // если нужно знать, сколько лайков
      comments: true, // опционально
    },
  });

  return posts.map((post) => ({
    id: post.id,
    mediaUrl: post.mediaUrl,
    publicId: post.publicId ?? "", // если может быть null — подстраховаться
    createdAt: post.createdAt,
    likesCount: post.likes.length,
    commentCount: post.comments.length,
  }));
}
