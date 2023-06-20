/*
  Warnings:

  - Added the required column `name` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenAddress` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenHash` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `Nft` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_collectionId_fkey";

-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "tokenAddress" TEXT NOT NULL,
ADD COLUMN     "tokenHash" TEXT NOT NULL,
ADD COLUMN     "tokenId" TEXT NOT NULL,
ADD COLUMN     "tokenUri" TEXT;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
