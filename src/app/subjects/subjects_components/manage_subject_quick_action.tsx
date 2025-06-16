"use client";

import {
  createNewSubject,
  createNewSubjectFromSD,
  getAllSubject,
  removeSubjectById,
  removeSubjectByIdFromSD,
} from "@/actions/prisma_actions";
import { getAllSubjectType } from "@/lib/types";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

function ManageSubjectsQuickAction({ val }: { val: string }) {
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
    const response = await removeSubjectByIdFromSD(formData);
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
      <div className="flex gap-2 text-slate-500">
        <button
          className="uppercase hover:underline underline-offset-2 cursor-pointer"
          onClick={() => setAdd(true)}
        >
          add
        </button>
        {"|"}
        <button
          className="uppercase hover:underline underline-offset-2 cursor-pointer"
          onClick={() => setRemove(true)}
        >
          remove
        </button>
      </div>

      {add && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="w-[500px] bg-neutral-800 rounded-md border-[1px] border-neutral-700 p-4 flex flex-col gap-4 shadow-2xl shadow-black">
            <div className="uppercase relative text-center">
              <div className="text-lg">Add Subject</div>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setAdd(false)}
              >
                <RxCross1 size={20} />
              </button>
            </div>
            <form
              action={createNewSubjectFunction}
              className="flex flex-col gap-4"
            >
              {val == "new" ? (
                <input
                  name="subjectName"
                  className="h-8 border-[1px] border-neutral-500 px-1 uppercase"
                  placeholder="Enter Subject Name"
                ></input>
              ) : (
                <input
                  className="h-8 border-[1px] border-neutral-500 px-1 uppercase"
                  readOnly
                  defaultValue={val}
                  name="subjectName"
                ></input>
              )}
              <input
                name="subjectCode"
                className="h-8 border-[1px] border-neutral-500 px-1 uppercase"
                placeholder="Enter Subject Code"
              ></input>
              <input
                name="subjectClass"
                className="h-8 border-[1px] border-neutral-500 px-1 uppercase"
                placeholder="Enter Subject class"
              ></input>
              <button className="h-8 bg-green-950">Submit</button>
            </form>
          </div>
        </div>
      )}

      {remove && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="w-[500px] bg-neutral-800 rounded-md border-[1px] border-neutral-700 p-4 flex flex-col gap-4 shadow-2xl shadow-black">
            <div className="uppercase relative text-center">
              <div className="text-lg">Remove Subject</div>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setRemove(false)}
              >
                <RxCross1 size={20} />
              </button>
            </div>
            <form action={removeSubject} className="flex flex-col gap-4">
              <select
                name="subjectId"
                className="h-8 border-[1px] border-neutral-500 px-1"
              >
                {allSubject?.map((val) => (
                  <option
                    key={val.id}
                    className="bg-neutral-800"
                    value={val.id}
                  >
                    {val.subjectName} {" | "}
                    {val.subjectCode}
                  </option>
                ))}
              </select>
              <button className="h-8 bg-green-950">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageSubjectsQuickAction;
