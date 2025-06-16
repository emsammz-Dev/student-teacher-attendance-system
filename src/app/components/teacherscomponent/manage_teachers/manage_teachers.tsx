"use client";

import {
  createNewTeacher,
  getAllTeacher,
  removeTeacher,
} from "@/actions/prisma_actions";
import { getAllTeachersType } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ManageTeachers() {
  const pathName = usePathname();
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [message, setMessage] = useState("");

  //  all classes
  const [allTeacher, setAllTeachers] = useState<getAllTeachersType[] | null>(
    null
  );

  async function createTeacher(formdata: FormData) {
    const response = await createNewTeacher(formdata);
    setMessage(response);
    setTimeout(() => {
      setMessage("");
      setAdd(false);
    }, 1000);
  }

  async function removeteacher(formData: FormData) {
    const response = await removeTeacher(formData, pathName);
    setMessage(response);
    setTimeout(() => {
      setMessage("");
      setRemove(false);
    }, 1000);
  }

  useEffect(() => {
    if (remove) {
      const fetchData = async () => {
        const a = await getAllTeacher();
        setAllTeachers(a);
      };
      fetchData();
    }
  }, [remove]);

  return (
    <>
      <div className="ring-1 ring-neutral-800 shadow-md shadow-black p-4 rounded-xl flex flex-col gap-4">
        <div className="text-lg text-center">Teacher</div>
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
                Add New Teacher
              </div>
              <form action={createTeacher} className="flex flex-col gap-4">
                <input
                  name="teacherFirstName"
                  className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  placeholder="Enter First Name"
                  autoComplete="off"
                />
                <input
                  name="teacherLastName"
                  className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  placeholder="Enter Last Name"
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
                Remove Teacher
              </div>

              {allTeacher && allTeacher.length >= 1 ? (
                <form action={removeteacher} className="flex flex-col gap-4">
                  <select
                    name="selectedTeacherId"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  >
                    <option className="px-2 bg-neutral-800" value={""}>
                      Select Teacher
                    </option>
                    {allTeacher.map((val, index) => (
                      <option
                        key={index}
                        className="px-2 bg-neutral-800"
                        value={val.id}
                      >
                        {val.firstName} {val.lastName}
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
                      onClick={() => setRemove(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="h-20 text-lg text-center content-center">
                  No Teachers To Remove
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ManageTeachers;
