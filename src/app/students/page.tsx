import {
  getAllClassWithSectionNStudent,
  getAllStudents,
} from "@/actions/prisma_actions";
import { getAllStudentsType } from "@/lib/types";
import Link from "next/link";
import StudentDashboardQuickAction from "./student_dashboard_quick_action";
import ManageStudent from "../components/studentscomponent/manage_students";
const classes = ["class1", "class2", "class1", "class2", "class1", "class2"];

export interface AccType {
  [key: string]: getAllStudentsType[];
}

async function StudentsDashboard() {
  const allStudents = await getAllStudents();
  const allClasses = await getAllClassWithSectionNStudent();

  const studentReduce = allStudents.reduce((acc, detail) => {
    if (detail.classModelId && detail.ClassModel?.name) {
      const classSection =
        detail.ClassModel?.name + detail.ClassModel?.SectionModel?.name;
      if (!acc[classSection]) {
        acc[classSection] = [];
      }
      acc[classSection] = [...acc[classSection], detail];
    }

    return acc;
  }, {} as AccType);

  console.log(studentReduce);
  return (
    <>
      <div className="p-8 flex flex-col gap-6">
        <div>
          <div className="text-3xl uppercase">students Dashboard</div>
          <div className="text-lg text-neutral-500">
            Lorem ipsum dolor sit amet consectetur.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {allClasses.map((val, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 bg-neutral-800 rounded-sm"
            >
              <div>
                <div className="text-xl uppercase">
                  Class {val.name}
                  {val.SectionModel?.name} students
                </div>
                <div className="flex gap-1">
                  <div className="text-neutral-500">Total Students :</div>
                  <div>{val.students.length}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-4 border-[1px] border-neutral-700 rounded-md flex flex-col gap-4">
            <div>
              <div className="text-xl uppercase">quick action</div>
              <div className="text-neutral-500">Manage Students</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <ManageStudent />
              {allClasses.map((val, index) => (
                <div key={index} className="p-4 bg-neutral-800 rounded-md">
                  <div className="text-xl uppercase">
                    class {val.name}
                    {val.SectionModel?.name}
                  </div>
                  <StudentDashboardQuickAction
                    key={val.id}
                    allStudentsWithClass={val}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentsDashboard;
