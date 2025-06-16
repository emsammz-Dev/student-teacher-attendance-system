import { getAllSubjectCount } from "@/actions/prisma_actions";
import Link from "next/link";

async function SubjectThumbnail() {
  const totalSubjects = await getAllSubjectCount();
  return (
    <div className="p-4 flex flex-col bg-neutral-900 rounded-xl shadow-md shadow-black">
      <div className="text-neutral-500">Total Subjects</div>
      <div className="text-2xl font-bold px-2">{totalSubjects}</div>
    </div>
  );
}

export default SubjectThumbnail;
