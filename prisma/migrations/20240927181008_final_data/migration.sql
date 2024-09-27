/*
  Warnings:

  - You are about to drop the column `endTime` on the `Bandobast` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Bandobast` table. All the data in the column will be lost.
  - You are about to drop the column `teamName` on the `Bandobast` table. All the data in the column will be lost.
  - You are about to drop the column `dutyLocation` on the `BandobastAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Patrolling` table. All the data in the column will be lost.
  - You are about to drop the `PatrollingAssignment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bandobastId` to the `BandobastAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Patrolling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numofOfficers` to the `Patrolling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisor` to the `Patrolling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleNumber` to the `Patrolling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bandobast" DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "teamName";

-- AlterTable
ALTER TABLE "BandobastAssignment" DROP COLUMN "dutyLocation",
ADD COLUMN     "bandobastId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patrolling" DROP COLUMN "location",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "numofOfficers" INTEGER NOT NULL,
ADD COLUMN     "patrolOfficers" TEXT[],
ADD COLUMN     "supervisor" TEXT NOT NULL,
ADD COLUMN     "vehicleNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "PatrollingAssignment";

-- CreateTable
CREATE TABLE "alertInfo" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgURL" TEXT[],
    "location" TEXT NOT NULL,
    "bandobastId" TEXT NOT NULL,
    "patrolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alertInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinates" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "latitude1" DOUBLE PRECISION NOT NULL,
    "longitude1" DOUBLE PRECISION NOT NULL,
    "latitude2" DOUBLE PRECISION NOT NULL,
    "longitude2" DOUBLE PRECISION NOT NULL,
    "latitude3" DOUBLE PRECISION NOT NULL,
    "longitude3" DOUBLE PRECISION NOT NULL,
    "latitude4" DOUBLE PRECISION NOT NULL,
    "longitude4" DOUBLE PRECISION NOT NULL,
    "bandobastId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodVendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imgURL" TEXT NOT NULL,
    "foodVendorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodVendor_phone_key" ON "FoodVendor"("phone");

-- AddForeignKey
ALTER TABLE "alertInfo" ADD CONSTRAINT "alertInfo_bandobastId_fkey" FOREIGN KEY ("bandobastId") REFERENCES "Bandobast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertInfo" ADD CONSTRAINT "alertInfo_patrolId_fkey" FOREIGN KEY ("patrolId") REFERENCES "Patrolling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BandobastAssignment" ADD CONSTRAINT "BandobastAssignment_bandobastId_fkey" FOREIGN KEY ("bandobastId") REFERENCES "Bandobast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinates" ADD CONSTRAINT "coordinates_bandobastId_fkey" FOREIGN KEY ("bandobastId") REFERENCES "Bandobast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_foodVendorId_fkey" FOREIGN KEY ("foodVendorId") REFERENCES "FoodVendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
