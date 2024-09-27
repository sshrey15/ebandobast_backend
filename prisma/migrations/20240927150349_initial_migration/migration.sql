-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "policeStationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DutyOfficer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "policeStationId" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DutyOfficer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoliceStation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PoliceStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bandobast" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bandobast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BandobastAssignment" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "officerName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "dutyLocation" TEXT NOT NULL,
    "supervisionOfficer" TEXT NOT NULL,
    "charterOfDuty" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "callSign" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BandobastAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "joinBandobast" (
    "id" TEXT NOT NULL,
    "bandobastId" TEXT NOT NULL,
    "dutyOfficerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "joinBandobast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patrolling" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "route" TEXT[],
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patrolling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatrollingAssignment" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "officerName" TEXT NOT NULL,
    "vehicleNumber" TEXT NOT NULL,
    "dutyLocation" TEXT NOT NULL,
    "supervisionOfficer" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "callSign" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatrollingAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_batchId_key" ON "Admin"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "DutyOfficer_phone_key" ON "DutyOfficer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "DutyOfficer_batchId_key" ON "DutyOfficer"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "PoliceStation_name_key" ON "PoliceStation"("name");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "PoliceStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyOfficer" ADD CONSTRAINT "DutyOfficer_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "PoliceStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "joinBandobast" ADD CONSTRAINT "joinBandobast_bandobastId_fkey" FOREIGN KEY ("bandobastId") REFERENCES "Bandobast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "joinBandobast" ADD CONSTRAINT "joinBandobast_dutyOfficerId_fkey" FOREIGN KEY ("dutyOfficerId") REFERENCES "DutyOfficer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
