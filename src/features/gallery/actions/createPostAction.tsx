"use server";

import { postRepository } from "@/entities/post/repositories/post";

type CreatePostData = {
  secure_url: string;
  resource_type: string;
  public_id: string;
};

type CreatePostResponse = {
  success: true;
  post: {
    id: string;
    mediaUrl: string;
    publicId: string;
    createdAt: Date;
  };
} | {
  success: false;
};

export async function createPostAction(data: CreatePostData): Promise<CreatePostResponse> {
  try {
    const post = await postRepository.savePost({
      mediaUrl: data.secure_url,
      publicId: data.public_id,
      mediaType: data.resource_type === "video" ? "VIDEO" : "IMAGE",
    });
    return { success: true, post };
  } catch (error) {
    console.error("Ошибка создания поста:", error);
    return { success: false };
  }
}
