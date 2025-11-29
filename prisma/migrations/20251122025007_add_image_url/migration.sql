/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_clientId_fkey";

-- DropTable
DROP TABLE "Car";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Sale";

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "description" TEXT,
    "imageUrl" TEXT DEFAULT 'https://via.placeholder.com/400x300?text=Car+Image',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
