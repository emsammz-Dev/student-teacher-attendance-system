"use client";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { getAllClassWithSectionNStudentType } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";

interface PropType {
  allStudentsWithClass: getAllClassWithSectionNStudentType;
}

function StudentDashboardQuickAction({ allStudentsWithClass }: PropType) {
  const [view, setView] = useState(false);

  return (
    <>
      <div className="flex gap-2 text-slate-500">
        <button
          className="bg-neutral-800 flex-1 p-2 rounded-md hover:bg-teal-800 hover:text-white"
          onClick={() => {
            setView(true);
          }}
        >
          View
        </button>
      </div>

      {/* student list */}
      <AnimatePresence>
        {view && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className="fixed inset-0 backdrop-blur-md flex justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ ease: "easeInOut" }}
              className="flex flex-col gap-2 bg-teal-950 rounded-xl w-[500px] h-2/3 p-4 shadow-md shadow-black relative"
            >
              <div className="text-lg text-center bg-zinc-900/80 rounded-md p-2 flex justify-between items-end">
                <div className="text-neutral-400 text-lg">Students List</div>
                <div className="text-sm text-neutral-400">
                  Class {allStudentsWithClass.name}
                  {allStudentsWithClass.SectionModel?.name}
                </div>
              </div>
              <div className="flex flex-1 overflow-auto">
                <div className="flex-1 flex p-4 border-[1px] border-neutral-700 rounded-md">
                  {allStudentsWithClass.students.length != 0 ? (
                    <div className="flex flex-col gap-2">
                      {allStudentsWithClass.students.map((val, index) => (
                        <div
                          key={val.id}
                          className="flex gap-4 hover:bg-neutral-900/60"
                        >
                          <div>{index + 1}.</div>
                          <div className="flex-1 flex gap-2">
                            <div>{val.firstName}</div>
                            <div>{val.lastName}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 text-center content-center">
                      No students Added
                    </div>
                  )}
                </div>
              </div>
              {/* cancel button */}
              <button
                className="absolute -top-3 -right-3 bg-teal-950 ring-1 ring-neutral-700 hover:bg-red-600 rounded-full p-1 cursor-pointer"
                onClick={() => setView(false)}
              >
                <RxCross1 size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default StudentDashboardQuickAction;
