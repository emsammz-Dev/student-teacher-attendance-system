import {
  getAllClassWithSection,
  getAllSubject,
} from "@/actions/prisma_actions";
import TimeTableComp from "./timetable_comp";

async function TimeTableDashboard() {
  const allSubjects = await getAllSubject();
  const allClass = await getAllClassWithSection();

  return (
    <>
      <div className="p-4 flex flex-col gap-4">
        <div className="p-4 ring-1 ring-neutral-700 rounded-xl">
          <div className="bg-neutral-900 p-4 rounded-xl text-xl">
            TimeTable DashBoard
          </div>
        </div>
        <div className="p-4 ring-1 ring-neutral-700 rounded-md">
          <TimeTableComp allClass={allClass} />
        </div>
      </div>
    </>
  );
}

export default TimeTableDashboard;
