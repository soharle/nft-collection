/*
  Warnings:

  - Added the required column `userId` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Made the column `collectionId` on table `Comments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_collectionId_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "collectionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
