"use client";
import { getClassModelWithSectionNStudentsType } from "@/lib/types";
import ClassQuickActionButton from "./class_quick_action_button";

function ManageClassHead({
  allClasses,
}: {
  allClasses: getClassModelWithSectionNStudentsType[];
}) {
  return (
    <>
      <div className="p-4 ring-1 ring-neutral-700 rounded-xl">
        <div className="p-4 bg-neutral-900 rounded-xl flex flex-col gap-4">
          <div>
            <div className="text-lg">Quick Action</div>
            <div className="text-neutral-500 text-sm">Manage Class Head</div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {allClasses.map((val, index) => (
              <div
                key={index}
                className="ring-1 ring-neutral-700 shadow-md shadow-black p-4 rounded-xl flex flex-col gap-4"
              >
                <div className="text-center text-lg">
                  <span>Class </span>
                  <span>{val.name}</span>
                  <span>{val.SectionModel?.name}</span>
                </div>
                <ClassQuickActionButton key={val.id} classId={val.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageClassHead;
