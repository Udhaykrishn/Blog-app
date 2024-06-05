/*
  Warnings:

  - You are about to drop the column `body` on the `Blog` table. All the data in the column will be lost.
  - Made the column `description` on table `Blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "body",
ALTER COLUMN "description" SET NOT NULL;
