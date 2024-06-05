/*
  Warnings:

  - You are about to drop the column `UserId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Blog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- DropIndex
DROP INDEX "Blog_UserId_idx";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "UserId",
DROP COLUMN "userId",
ADD COLUMN     "userid" TEXT;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
