import { getTotalteacherModelCount } from "@/actions/prisma_actions";
import Link from "next/link";

async function TeacherThumbnail() {
  const totalTeacher = await getTotalteacherModelCount();
  return (
    <div className="p-4 flex flex-col bg-neutral-900 rounded-xl shadow-md shadow-black">
      <div className="text-neutral-500">Total Teachers</div>
      <div className="text-2xl font-bold px-2">{totalTeacher}</div>
    </div>
  );
}

export default TeacherThumbnail;
