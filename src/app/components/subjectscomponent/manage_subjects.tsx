"use client";

import {
  createNewSubjectFromSD,
  getAllSubject,
  removeSubjectById,
} from "@/actions/prisma_actions";
import { getAllSubjectType } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

function ManageSubjects() {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [message, setMessage] = useState("");

  //  all subjects
  const [allSubject, setAllSubject] = useState<getAllSubjectType[] | null>(
    null
  );

  async function createNewSubjectFunction(formdata: FormData) {
    const response = await createNewSubjectFromSD(formdata);
    setMessage(response);
    setTimeout(() => {
      setMessage("");
      setAdd(false);
    }, 1000);
  }

  async function removeSubject(formData: FormData) {
    const response = await removeSubjectById(formData);
    setMessage(response);
    setTimeout(() => {
      setMessage("");
      setRemove(false);
    }, 2000);
  }

  useEffect(() => {
    if (remove) {
      const fetchData = async () => {
        const a = await getAllSubject();
        setAllSubject(a);
      };
      fetchData();
    }
  }, [remove]);

  return (
    <>
      <div className="ring-1 ring-neutral-800 shadow-md shadow-black p-4 rounded-xl flex flex-col gap-4">
        <div className="text-lg text-center">Subject</div>
        <div className="text-md flex gap-2">
          <button
            onClick={() => setAdd(true)}
            className="flex-1 hover:bg-teal-800 bg-neutral-800 text-teal-600 hover:text-white rounded-md text-center p-2"
          >
            Add
          </button>
          <button
            onClick={() => setRemove(true)}
            className="flex-1 hover:bg-teal-800 bg-neutral-800 text-teal-600 hover:text-white rounded-md text-center p-2"
          >
            Remove
          </button>
        </div>
      </div>
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
                New Subject
              </div>

              <form
                action={createNewSubjectFunction}
                className="flex flex-col gap-4"
              >
                <input
                  name="subjectName"
                  className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  placeholder="Enter Subject Name"
                  autoComplete="off"
                />
                <input
                  name="subjectCode"
                  className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  placeholder="Enter Subject Code"
                  autoComplete="off"
                />
                <input
                  name="subjectClass"
                  className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  placeholder="Enter Subject Class"
                  autoComplete="off"
                />

                <div className="text-center h-8 content-center">{message}</div>
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

        {remove && (
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
                Remove Subject
              </div>

              {allSubject && allSubject.length >= 1 ? (
                <form action={removeSubject} className="flex flex-col gap-4">
                  <select
                    name="selectedStudentId"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  >
                    <option className="px-2 bg-neutral-800" value={""}>
                      select subject
                    </option>
                    {allSubject.map((val, index) => (
                      <option
                        key={index}
                        className="px-2 bg-neutral-800"
                        value={val.id}
                      >
                        {val.subjectName} {"|"} {val.subjectCode}
                      </option>
                    ))}
                  </select>
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
                        setRemove(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="h-20 text-lg text-center content-center">
                  No Subject To Remove
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ManageSubjects;
