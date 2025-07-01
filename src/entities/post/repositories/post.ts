import { prisma } from "@/shared/lib/db";

type SavePostData = {
  mediaUrl: string;
  publicId: string;
  mediaType: "VIDEO" | "IMAGE";
};

type SavePostResult = {
  id: string;
  mediaUrl: string;
  publicId: string;
  createdAt: Date;
};

export const postRepository = {
  async savePost(data: SavePostData): Promise<SavePostResult> {
    const post = await prisma.post.create({
      data,
      select: {
        id: true,
        mediaUrl: true,
        publicId: true,
        createdAt: true,
      },
    });

    if (!post.mediaUrl) {
      throw new Error("Failed to create post: mediaUrl is null");
    }

    return post as SavePostResult;
  },

  likePost(data: { postId: string; userId: string }) {
    return prisma.like.create({
      data: {
        post: { connect: { id: data.postId } },
        user: { connect: { id: data.userId } },
      },
    });
  },
};
