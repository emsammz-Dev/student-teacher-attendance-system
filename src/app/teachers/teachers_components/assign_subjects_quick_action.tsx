"use client";
import {
  createTeacherSubject,
  getAllSubject,
  getAllTeachersSubjectsByTeacherId,
  removeTeacherSubjectById,
} from "@/actions/prisma_actions";
import {
  getAllTeachersSubjectsByTeacherIdType,
  getAllTeachersWithClassNSectionType,
  PrismaModel,
} from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import SubjectAssignButton from "./subject_assign_button";

function TeacherQuickAction({
  allTeachers,
}: {
  allTeachers: getAllTeachersWithClassNSectionType[];
}) {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [view, setView] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState("");
  const [allSubject, setAllSubject] = useState<
    PrismaModel.SubjectModel[] | null
  >(null);

  const [allTeacherSubject, setAllTeacherSubject] = useState<
    getAllTeachersSubjectsByTeacherIdType[]
  >([]);

  useEffect(() => {
    if (add) {
      const fetchData = async () => {
        const a = await getAllSubject();
        setAllSubject(a);
      };
      fetchData();
    }
  }, [add]);

  useEffect(() => {
    if (remove || view) {
      const fetchData = async () => {
        const a = await getAllTeachersSubjectsByTeacherId(teacherId);
        setAllTeacherSubject(a);
      };
      fetchData();
    }
  }, [remove, view]);

  async function createNewSubjectTeacher(formData: FormData) {
    const a = await createTeacherSubject(formData);
    setMessage(a);
    setTimeout(() => {
      setMessage("");
      setAdd(false);
    }, 2000);
  }

  async function removeSubject(formData: FormData) {
    const a = await removeTeacherSubjectById(formData);
    setMessage(a);
    setTimeout(() => {
      setMessage("");
      setRemove(false);
    }, 2000);
  }

  return (
    <>
      <div className="p-4 ring-1 ring-neutral-700 rounded-xl">
        <div className="p-4 bg-neutral-900 rounded-xl flex flex-col gap-4">
          <div>
            <div className="text-lg">Quick Action</div>
            <div className="text-stone-400 text-sm">
              Manage Teacher Subjects
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {allTeachers.map((val, index) => (
              <div
                key={index}
                className="p-4 ring-1 ring-neutral-700 rounded-xl flex flex-col gap-4"
              >
                <div className="flex gap-1 justify-center">
                  <span className="">Mr/Mrs.</span>
                  <span>{val.firstName}</span>
                  <span>{val.lastName}</span>
                </div>
                <div className="flex justify-between gap-2 text-slate-400">
                  <SubjectAssignButton teacherId={val.id} />
                  <button
                    className="flex-1 bg-neutral-800 rounded-md p-2 hover:bg-teal-800 hover:text-white cursor-pointer"
                    onClick={() => {
                      setRemove(true);
                      setTeacherId(val.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 ring-1 ring-neutral-700 rounded-xl">
        <div className="p-4 bg-neutral-900 rounded-xl flex flex-col gap-4">
          <div>
            <div className="text-lg">View Action</div>
            <div className="text-stone-400 text-sm">View Teacher Subjects</div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {allTeachers.map((val, index) => (
              <div
                key={index}
                className="p-4 ring-1 ring-neutral-700 rounded-xl flex flex-col gap-4"
              >
                <div className="flex gap-1 justify-center">
                  <span className="">Mr/Mrs.</span>
                  <span>{val.firstName}</span>
                  <span>{val.lastName}</span>
                </div>
                <div className="flex justify-between gap-2 text-slate-400">
                  <button
                    className="flex-1 bg-neutral-800 rounded-md p-2 hover:bg-teal-800 hover:text-white cursor-pointer"
                    onClick={() => {
                      setTeacherId(val.id);
                      setView(true);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
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
              {allTeacherSubject && allTeacherSubject?.length >= 1 ? (
                <form action={removeSubject} className="flex flex-col gap-4">
                  <select
                    name="teacherSubjectId"
                    className="h-8 border-[1px] border-green-900 focus:outline-none px-2"
                  >
                    <option value={""} className="bg-neutral-800 px-2">
                      Select Subject
                    </option>
                    {allTeacherSubject?.map((val) => (
                      <option
                        key={val.id}
                        value={val.id}
                        className="bg-neutral-800 px-2"
                      >
                        {val.subject?.subjectName}
                        {" | "}
                        {val.subject?.subjectCode}
                      </option>
                    ))}
                  </select>

                  <div className="h-10 content-center text-center">
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
                <div className="flex flex-col gap-4">
                  <div className="h-20 text-center content-center">
                    No Subjects To Remove
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <button
                      type="submit"
                      className="flex-1 bg-zinc-700/80 hover:bg-zinc-700 h-8 cursor-pointer pointer-events-none"
                    >
                      Submit
                    </button>
                    <button
                      className="flex-1 bg-zinc-700/80 hover:bg-zinc-700 h-8 cursor-pointer"
                      onClick={() => setRemove(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {view && (
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
              className="flex flex-col gap-4 bg-teal-950 rounded-xl w-[400px] p-4 shadow-md shadow-black select-none relative"
            >
              <div className="text-lg text-center bg-zinc-900/80 p-2">
                Remove Teacher
              </div>

              <div className="flex flex-wrap gap-4">
                {allTeacherSubject.map((val) => (
                  <div
                    key={val.id}
                    className="p-2 bg-neutral-900  flex gap-1 text-center rounded-md"
                  >
                    <span>{val.subject?.subjectCode}</span>
                    {val.subjectClass && (
                      <div>
                        <span>{val.subjectClass?.name}</span>
                        <span>{val.subjectClass?.SectionModel?.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="absolute -right-3 -top-3 cursor-pointer bg-teal-900/20 ring-1 ring-neutral-700 p-1 rounded-full"
                onClick={() => setView(false)}
              >
                <RxCross1 size={25} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default TeacherQuickAction;
