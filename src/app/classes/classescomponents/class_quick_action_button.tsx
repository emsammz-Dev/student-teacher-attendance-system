import {
  assignClassHead,
  removeClassHead,
  getAllTeachers,
} from "@/actions/prisma_actions";
import { PrismaModel } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

function ClassQuickActionButton({ classId }: { classId: string }) {
  const [assign, setAssign] = useState(false);
  const [message, setMessage] = useState("");
  const [allTeachers, setAllTeachers] = useState<
    PrismaModel.TeacherModel[] | null
  >(null);

  async function assignClassHeadTeacher(formData: FormData) {
    const response = await assignClassHead(formData);
    setMessage(response);
    setTimeout(() => {
      setMessage("");
      setAssign(false);
    }, 1000);
  }

  async function removeClassHeadFunction() {
    await removeClassHead(classId);
  }

  useEffect(() => {
    if (assign) {
      const fetchData = async () => {
        const a = await getAllTeachers();
        setAllTeachers(a);
      };
      fetchData();
    }
  }, [assign]);
  return (
    <>
      <div className="flex gap-2 text-slate-400">
        <button
          className="flex-1 bg-neutral-800 p-2 rounded-md hover:bg-teal-900 hover:text-white"
          onClick={() => setAssign(true)}
        >
          Assign
        </button>
        <button
          className="flex-1 bg-neutral-800 p-2 rounded-md hover:bg-teal-900 hover:text-white"
          onClick={removeClassHeadFunction}
        >
          Remove
        </button>
      </div>
      <AnimatePresence>
        {assign && (
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
              <div className="text-center">Assign Head Teacher</div>
              {allTeachers && allTeachers.length >= 1 ? (
                <form
                  action={assignClassHeadTeacher}
                  className="flex flex-col gap-4"
                >
                  <select
                    name="selectedTeacherId"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  >
                    <option className="px-2 bg-neutral-800" value={""}>
                      Select Teacher
                    </option>
                    {allTeachers.map((val, index) => (
                      <option
                        key={index}
                        className="px-2 bg-neutral-800"
                        value={val.id}
                      >
                        {val.firstName} {val.lastName}
                      </option>
                    ))}
                  </select>
                  <input
                    name="selectedClassId"
                    defaultValue={classId}
                    hidden
                  ></input>
                  <div className="text-center h-8 content-center">
                    {message}
                  </div>
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
                        setAssign(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="h-20 text-center content-center text-lg">
                  No Teacher To Assign
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ClassQuickActionButton;
