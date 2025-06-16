import { getTotalStudentModelCount } from "@/actions/prisma_actions";
import Link from "next/link";

async function StudentThumbnail() {
  const totalStudents = await getTotalStudentModelCount();
  return (
    <div className="p-4 flex flex-col bg-neutral-900 rounded-xl shadow-md shadow-black">
      <div className="text-neutral-500">Total Students</div>
      <div className="text-2xl font-bold px-2">{totalStudents}</div>
    </div>
  );
}

export default StudentThumbnail;
