"use server";

import { prisma } from "@/shared/lib/db";
import { Either, left, right } from "@/shared/lib/either";
import { CreateLikeResponse } from "@/entities/like/domain";

export async function toggleLike(
  userId: string,
  postId: string,
): Promise<Either<string, CreateLikeResponse>> {
  try {
    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!existingLike) {
      const newLike = await prisma.like.create({
        data: { userId, postId },
      });
      return right({ like: newLike });
    } else {
      await prisma.like.delete({
        where: { userId_postId: { userId, postId } },
      });
      return right({ like: existingLike });
    }
  } catch (error) {
    console.error("Ошибка при переключении лайка:", error);
    return left("Не удалось переключить лайк");
  }
}
