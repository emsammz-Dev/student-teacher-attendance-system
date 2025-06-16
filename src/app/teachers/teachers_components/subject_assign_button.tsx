"use client";

import { createTeacherSubject, getAllSubject } from "@/actions/prisma_actions";
import { PrismaModel } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function SubjectAssignButton({ teacherId }: { teacherId: string }) {
  const [add, setAdd] = useState(false);
  const [allSubject, setAllSubject] = useState<
    PrismaModel.SubjectModel[] | null
  >(null);

  const [message, setMessage] = useState("");

  async function createNewSubjectTeacher(formData: FormData) {
    const a = await createTeacherSubject(formData);
    setMessage(a);
    setTimeout(() => {
      setMessage("");
      setAdd(false);
    }, 2000);
  }

  useEffect(() => {
    if (add) {
      const fetchData = async () => {
        const a = await getAllSubject();
        setAllSubject(a);
      };
      fetchData();
    }
  }, [add]);
  return (
    <>
      <button
        className="flex-1 bg-neutral-800 rounded-md p-2 hover:bg-teal-800 hover:text-white cursor-pointer"
        onClick={() => setAdd(true)}
      >
        Assign
      </button>

      <AnimatePresence>
        {add && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              animate: { ease: "easeOut" }, // Open speed
              exit: { ease: "easeIn" }, // Close speed
            }}
            className="fixed inset-0 backdrop-blur-md flex justify-center items-center"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                animate: { ease: "easeOut" }, // Open speed
                exit: { ease: "easeIn" }, // Close speed
              }}
              className="flex flex-col gap-4 bg-teal-950 rounded-xl w-[400px] p-4 shadow-md shadow-black select-none"
            >
              <div className="text-lg text-center bg-zinc-900/80 p-2">
                Add New Subject
              </div>
              <form
                action={createNewSubjectTeacher}
                className="flex flex-col gap-4"
              >
                <select
                  name="selectedSubjectId"
                  className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                >
                  <option value={""} className="bg-neutral-800">
                    Select Subject
                  </option>
                  {allSubject?.map((val) => (
                    <option
                      key={val.id}
                      value={val.id}
                      className="bg-neutral-800"
                    >
                      {val.subjectName}
                      {" | "}
                      {val.subjectCode}
                    </option>
                  ))}
                </select>
                <input defaultValue={teacherId} hidden name="teacherId" />
                <div className="h-10 content-center text-center">{message}</div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-zinc-700/80 hover:bg-zinc-700 h-8 cursor-pointer"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-zinc-700/80 hover:bg-zinc-700 h-8 cursor-pointer"
                    onClick={(e) => {
                      setAdd(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SubjectAssignButton;
