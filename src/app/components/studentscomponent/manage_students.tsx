"use client";

import {
  createNewStudent,
  getAllClassWithSection,
  getAllStudents,
  removeStudentById,
} from "@/actions/prisma_actions";
import { getAllClassWithSectionType, getAllStudentsType } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function ManageStudent() {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [message, setMessage] = useState("");

  //  all classes
  const [allClass, setAllClass] = useState<getAllClassWithSectionType[] | null>(
    null
  );

  const [allStudent, setAllStudent] = useState<getAllStudentsType[] | null>(
    null
  );

  async function createNewStudentToClass(formdata: FormData) {
    const response = await createNewStudent(formdata);
    setMessage(response);
    setTimeout(() => {
      setMessage("");
      setAdd(false);
    }, 1000);
  }

  async function removeStudent(formData: FormData) {
    const response = await removeStudentById(formData);
    setMessage(response);
    setTimeout(() => {
      setMessage("");
      setRemove(false);
    }, 2000);
  }

  useEffect(() => {
    if (add) {
      const fetchData = async () => {
        const a = await getAllClassWithSection();
        setAllClass(a);
      };
      fetchData();
    }
  }, [add]);

  useEffect(() => {
    if (remove) {
      const fetchData = async () => {
        const a = await getAllStudents();
        setAllStudent(a);
      };
      fetchData();
    }
  }, [remove]);

  return (
    <>
      <div className="ring-1 ring-neutral-700 shadow-md shadow-black p-4 rounded-md flex flex-col gap-4">
        <div className="text-lg text-center">Student</div>
        <div className="text-md flex gap-2">
          <button
            type="button"
            onClick={() => setAdd(true)}
            className="flex-1 hover:bg-teal-800 bg-neutral-800 text-teal-600 hover:text-white rounded-md text-center p-2"
          >
            Add
          </button>
          <button
            type="button"
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
              className="flex flex-col gap-4 bg-teal-950 rounded-xl w-[400px] p-4 shadow-md shadow-black"
            >
              <div className="text-lg text-center bg-zinc-900/80 p-2">
                New Student
              </div>
              {allClass && allClass.length >= 1 ? (
                <form
                  action={createNewStudentToClass}
                  className="flex flex-col gap-4"
                >
                  <input
                    name="studentFirstName"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                    placeholder="Enter First Name"
                    autoComplete="off"
                  />
                  <input
                    name="studentLastName"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                    placeholder="Enter Last Name"
                    autoComplete="off"
                  />
                  <select
                    name="studentClassId"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  >
                    <option value={""} className="px-2  bg-neutral-800">
                      Select Class
                    </option>
                    {allClass.map((val) => (
                      <option
                        key={val.id}
                        value={val.id}
                        className="px-2 bg-neutral-800"
                      >
                        {val.name}
                        {val.SectionModel?.name}
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
                        setAdd(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="h-20 text-center content-center">
                  No Class To Add Student
                </div>
              )}
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
                Remove student
              </div>

              {allStudent && allStudent.length >= 1 ? (
                <form action={removeStudent} className="flex flex-col gap-4">
                  <select
                    name="selectedStudentId"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  >
                    <option className="px-2 bg-neutral-800" value={""}>
                      Select Student
                    </option>
                    {allStudent.map((val, index) => (
                      <option
                        key={index}
                        className="px-2 bg-neutral-800"
                        value={val.id}
                      >
                        {val.firstName} {val.lastName} {"|"}{" "}
                        {val.ClassModel?.name}
                        {val.ClassModel?.SectionModel?.name}
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
                      Remove
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
                  No Student To Remove
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ManageStudent;
