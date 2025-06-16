-- DropForeignKey
ALTER TABLE "ClassModel" DROP CONSTRAINT "ClassModel_sectionModelId_fkey";

-- AddForeignKey
ALTER TABLE "ClassModel" ADD CONSTRAINT "ClassModel_sectionModelId_fkey" FOREIGN KEY ("sectionModelId") REFERENCES "SectionModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
