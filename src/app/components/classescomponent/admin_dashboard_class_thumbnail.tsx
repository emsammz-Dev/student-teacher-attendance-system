import { getTotalClassModelCount } from "@/actions/prisma_actions";
import Link from "next/link";

async function ClassThumbnail() {
  const classCount = await getTotalClassModelCount();

  return (
    <div className="p-4 flex flex-col bg-neutral-900 rounded-xl shadow-md shadow-black">
      <div className="text-neutral-500">Total Classes</div>
      <div className="text-2xl font-bold px-2">{classCount}</div>
    </div>
  );
}

export default ClassThumbnail;
