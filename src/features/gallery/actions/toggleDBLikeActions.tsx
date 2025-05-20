"use server";
import { prisma } from "@/shared/lib/db";
import { left, right, Either } from "@/shared/lib/either";

interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

type CreateLikeResponse = {
  like: Like;
};

export async function createLikeAction(
  userId: string,
  postId: string,
): Promise<Either<string, CreateLikeResponse> | void> {
  try {
    // Проверка на существование лайка (опционально)
    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    console.log(existingLike, postId, userId);
    if (!existingLike) {
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return right({ like: newLike });
    }

    await prisma.like.deleteMany({
      where: {
        userId: existingLike.userId,
        postId: existingLike.postId,
      },
    });
  } catch (error) {
    console.error("Ошибка при создании лайка:", error);
    return left("Не удалось поставить лайк");
  }
}
