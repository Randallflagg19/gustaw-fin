"use server";

import { prisma } from "@/shared/lib/db";

type CloudinaryUploadInfo = {
  secure_url: string;
  resource_type: string;
};

export async function addPostAction(info: CloudinaryUploadInfo) {
  console.log("addPostAction called with:", info);

  return prisma.post.create({
    data: {
      mediaUrl: info.secure_url,
      mediaType: info.resource_type === "video" ? "VIDEO" : "IMAGE",
    },
  });
}
