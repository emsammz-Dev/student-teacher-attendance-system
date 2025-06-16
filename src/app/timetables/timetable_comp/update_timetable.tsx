"use client";
import {
  createTimeTableByClassId,
  getAllTeachersSubjectsByClassName,
  getTimetableByClassId,
  removeSubjectOfClassFromTimetableModel,
} from "@/actions/prisma_actions";
import {
  getAllTeachersSubjectsByClassNameType,
  PrismaModel,
} from "@/lib/types";
import { time } from "console";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

export interface AccType {
  [day: string]: {
    time: string;
    subject: string | null | undefined;
  }[];
}

const timeslots = [
  "8.00-9.00",
  "9.00-10.00",
  "10:30-11:30",
  "11:30-12:30",
  "12:30-1:30",
  "1:30-2:30",
];

const days = ["Mon", "Tue", "Weds", "Thus", "Fri", "Sat"];

function UpdateTimeTable({
  classId,
  classNames,
}: {
  classId: string;
  classNames: string;
}) {
  const [dragged, setDragged] =
    useState<getAllTeachersSubjectsByClassNameType | null>(null);

  const [show, setShow] = useState(false);
  const [classSubjects, setClassSubjects] = useState<
    getAllTeachersSubjectsByClassNameType[] | null
  >(null);

  const [defaultTimeTable, setDefaultTimeTable] = useState<AccType | null>(
    null
  );

  // remove subject useStates
  const [removeSubject, setRemoveSubject] = useState(false);
  const [subjectCode, setSubjectCode] = useState("");
  const [daySave, setDaySave] = useState("");
  const [timeSave, setTimeSave] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const a = await getAllTeachersSubjectsByClassName(classNames);
      setClassSubjects(a);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (show || removeSubject) {
      const fetchData = async () => {
        const a = await getTimetableByClassId(classId);
        const data = days.reduce((acc, detail) => {
          acc[detail] = timeslots.map((val1) => {
            const data = a.find(
              (value) =>
                value.timeTableSlot?.day == detail &&
                value.timeTableSlot.time == val1
            );

            if (data) {
              // console.log(
              //   data?.TeacherSubjects?.subject?.subjectCode,
              //   data?.timeTableSlot?.time
              // );
              const subCode = data?.TeacherSubjects?.subject?.subjectCode;
              if (subCode) {
                return {
                  time: val1,
                  subject: data.TeacherSubjects?.subject?.subjectCode,
                };
              }
            }
            return { time: val1, subject: null };
          });
          return acc;
        }, {} as AccType);

        setDefaultTimeTable(data);
      };
      fetchData();
    }
  }, [show, removeSubject]);

  //  time table dragg and drop
  function onDraggedStart(val: getAllTeachersSubjectsByClassNameType) {
    setDragged(val);
  }
  function handleDragOver(e: any) {
    e.preventDefault();
  }
  async function handleOnDrop(day: string, time: string) {
    if (defaultTimeTable) {
      const copy = { ...defaultTimeTable };
      copy[day] = defaultTimeTable[day].map((val) => {
        if (val.time == time) {
          return { time: time, subject: dragged?.subject?.subjectCode };
        }
        return val;
      });
      setDefaultTimeTable(copy);
    }
    // fetch data
    const techerSubjectId = dragged?.id;
    const a = await createTimeTableByClassId(
      classId,
      day,
      time,
      techerSubjectId
    );
  }

  function removeSubjectFromTT(
    day: string,
    time: string,
    subject: string | null | undefined
  ) {
    if (subject) {
      setRemoveSubject(true);
      setSubjectCode(subject);
      setDaySave(day);
      setTimeSave(time);
    }
  }

  async function removeButton() {
    await removeSubjectOfClassFromTimetableModel(daySave, timeSave, classId);
    cancelButton();
  }

  function cancelButton() {
    setRemoveSubject(false);
    setSubjectCode("");
    setDaySave("");
    setTimeSave("");
  }

  return (
    <>
      <div
        className="bg-teal-900 flex-1 text-center p-1 cursor-pointer"
        onClick={() => setShow(true)}
      >
        Update
      </div>

      {show && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="flex flex-col gap-4 w-[700px] bg-neutral-800 p-4 rounded-xl shadow-xl shadow-black relative">
            <div className="ring-1 ring-neutral-700 p-4">
              <div className="flex flex-wrap gap-2">
                {classSubjects ? (
                  classSubjects.map((val) => (
                    <div
                      key={val.id}
                      className="bg-teal-800 px-2 cursor-pointer"
                      draggable={true}
                      onDrag={() => onDraggedStart(val)}
                    >
                      {val.subject?.subjectName}
                    </div>
                  ))
                ) : (
                  <div>Assign Teacher To Subject</div>
                )}
              </div>
            </div>

            <div>
              <table className="table-auto w-full border border-gray-400">
                <thead>
                  <tr className="h-12 bg-teal-950">
                    <th className=" border border-gray-400">Day/Time</th>
                    {timeslots.map((val, index) => (
                      <th key={index} className=" border border-gray-400">
                        {val}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, index) => (
                    <tr key={index} className="h-10">
                      <td className="border border-gray-400 bg-teal-950 uppercase text-center">
                        {day}
                      </td>
                      {defaultTimeTable &&
                        defaultTimeTable[day].map((val, index) => (
                          <td
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={() => handleOnDrop(day, val.time)}
                            key={index}
                            draggable
                            className=" border border-gray-400 text-center"
                          >
                            {val.subject == null ? (
                              <div>----</div>
                            ) : (
                              <div
                                className="bg-red-400 cursor-pointer"
                                onClick={() =>
                                  removeSubjectFromTT(
                                    day,
                                    val.time,
                                    val.subject
                                  )
                                }
                              >
                                {val.subject}
                              </div>
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className="absolute -right-3 -top-3 bg-white/30 rounded-full p-1 hover:bg-red-800 cursor-pointer"
              onClick={() => {
                setShow(false);
              }}
            >
              <RxCross1 size={25} />
            </div>
          </div>
        </div>
      )}

      {removeSubject && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="flex flex-col gap-4 w-[400px] bg-red-800 p-4 rounded-xl shadow-xl shadow-black">
            <div className="text-center">Remove {subjectCode}</div>
            <div className="flex gap-4 justify-center">
              <button
                className="flex-1 ring-1 cursor-pointer"
                onClick={removeButton}
              >
                Remove
              </button>
              <button
                className="flex-1 ring-1 cursor-pointer"
                onClick={cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateTimeTable;
