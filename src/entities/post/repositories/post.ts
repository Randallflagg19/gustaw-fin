import { prisma } from "@/shared/lib/db";

export async function savePost(data: {
  mediaUrl: string;
  publicId: string;
  mediaType: "VIDEO" | "IMAGE";
}) {
  return prisma.post.create({
    data,
  });
}

export async function likePost(data: { postId: string; userId: string }) {
  return prisma.like.create({
    data: {
      post: { connect: { id: data.postId } },
      user: { connect: { id: data.userId } },
    },
  });
}

export const postRepository = {
  savePost,
  likePost,
};
