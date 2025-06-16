/*
  Warnings:

  - A unique constraint covering the columns `[sectionModelId]` on the table `ClassModel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ClassModel" ADD COLUMN     "sectionModelId" TEXT;

-- CreateTable
CREATE TABLE "SectionModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SectionModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassModel_sectionModelId_key" ON "ClassModel"("sectionModelId");

-- AddForeignKey
ALTER TABLE "ClassModel" ADD CONSTRAINT "ClassModel_sectionModelId_fkey" FOREIGN KEY ("sectionModelId") REFERENCES "SectionModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
