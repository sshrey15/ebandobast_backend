/*
  Warnings:

  - You are about to drop the column `adminId` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `sendtoId` on the `Meeting` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_adminId_fkey";

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "adminId",
DROP COLUMN "sendtoId",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "receiverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
