import { prisma } from "@/shared/lib/db";

export async function savePost(data: {
  mediaUrl: string;
  mediaType: "VIDEO" | "IMAGE";
}) {
  return prisma.post.create({
    data,
  });
}

export const postRepository = {
  savePost,
};
