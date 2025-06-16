import { getAllClassWithSectionType } from "@/lib/types";
import UpdateTimeTable from "./timetable_comp/update_timetable";

function TimeTableComp({
  allClass,
}: {
  allClass: getAllClassWithSectionType[];
}) {
  return (
    <>
      <div className="p-4 bg-neutral-900 rounded-md flex flex-col gap-4">
        <div>Quick Action</div>
        <div className="grid grid-cols-4 gap-4">
          {allClass.map((val, index) => (
            <div
              key={val.id}
              className="bg-neutral-800 rounded-md p-4 flex flex-col gap-4 shadow-md shadow-black hover:shadow-md"
            >
              <div className="text-center">
                Class {val.name}
                {val.SectionModel?.name}
              </div>
              <div className="flex gap-4 justify-between">
                <UpdateTimeTable
                  classId={val.id}
                  key={val.id}
                  classNames={val.name}
                />
                <div className="bg-teal-900 flex-1 text-center p-1">View</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TimeTableComp;
