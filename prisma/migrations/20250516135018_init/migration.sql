/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "Post_authorId_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "mediaUrl" DROP NOT NULL,
ALTER COLUMN "mediaType" DROP NOT NULL;
