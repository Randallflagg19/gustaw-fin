import { Like as PrismaLike } from "@prisma/client";
import { LikeEntity } from "../domain";
import { prisma } from "@/shared/lib/db";

function mapPrismaLike(prismaLike: PrismaLike): LikeEntity {
  return {
    id: prismaLike.id,
    userId: prismaLike.userId,
    postId: prismaLike.postId,
    createdAt: prismaLike.createdAt,
  };
}

export const like = {
  /**
   * Найти запись лайка по составному индексу (userId + postId)
   */
  async findByUserAndPost(
    userId: string,
    postId: string,
  ): Promise<LikeEntity | null> {
    const prismaLike = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });
    return prismaLike ? mapPrismaLike(prismaLike) : null;
  },

  /**
   * Создать новый лайк
   */
  async create(userId: string, postId: string): Promise<LikeEntity> {
    const newLike = await prisma.like.create({
      data: { userId, postId },
    });
    return mapPrismaLike(newLike);
  },

  /**
   * Удалить лайк (по составному индексу userId+postId)
   */
  async delete(userId: string, postId: string): Promise<void> {
    await prisma.like.delete({
      where: { userId_postId: { userId, postId } },
    });
  },

  /**
   * Посчитать количество лайков у конкретного поста
   */
  async countByPost(postId: string): Promise<number> {
    return prisma.like.count({
      where: { postId },
    });
  },
};
