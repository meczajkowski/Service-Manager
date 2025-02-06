-- CreateEnum
CREATE TYPE "DeviceModel" AS ENUM ('C224', 'C224e', 'C258', 'C250i', 'C251i');

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "model" "DeviceModel" NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");
