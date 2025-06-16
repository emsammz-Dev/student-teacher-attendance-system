import { getClassModelWithSectionNStudents } from "@/actions/prisma_actions";
import ManageClassHead from "./classescomponents/classes_quick_action";
import ManageClasses from "../components/classescomponent/manage_classes/manage_classes";
import ManageStudent from "../components/studentscomponent/manage_students";
import StudentDashboardQuickAction from "../students/student_dashboard_quick_action";

async function ClassesDashboard() {
  const allClasses = await getClassModelWithSectionNStudents();

  return (
    <>
      <div className="p-4 flex flex-col gap-4 bg-teal-950">
        <div className="p-4 ring-1 ring-neutral-700 rounded-xl flex flex-col gap-4">
          <div className="bg-neutral-900 p-4 rounded-xl shadow-md shadow-black">
            <div className="text-2xl">Class Dashboard</div>
            <div className="text-neutral-500">
              Lorem ipsum dolor sit amet consectetur.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-4 rounded-xl ring-1 ring-neutral-700">
          {allClasses.map((val, index) => (
            <div
              key={index}
              className="p-4 bg-neutral-900 rounded-xl flex flex-col"
            >
              <div className="text-slate-400 text-lg">
                <span>Class </span>
                <span>{val.name}</span>
                <span>{val.SectionModel?.name}</span>
              </div>
              <div>
                <div className="flex gap-1">
                  <div className="text-neutral-500">ClassHead :</div>
                  {val.TeacherModel ? (
                    <div className="flex gap-1">
                      <div className="flex gap-1">
                        <span>{val.TeacherModel.firstName}</span>
                        <span>{val.TeacherModel.lastName}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-neutral-500">- - - - -</div>
                  )}
                </div>
                <div className="flex gap-1">
                  <div className="text-neutral-500">Total Students :</div>
                  <div className="font-bold">{val.students.length}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 ring-1 ring-neutral-700 rounded-xl flex gap-4">
          <div className="flex-1 p-4 flex flex-col gap-4 rounded-xl bg-neutral-900">
            <div className="text-lg">New Class</div>
            <ManageClasses />
          </div>

          <div className="flex-1 p-4 flex flex-col gap-4 rounded-xl bg-neutral-900">
            <div className="text-lg">Recent Activity</div>
            <div></div>
          </div>
        </div>

        {/* quick action class head */}
        <ManageClassHead allClasses={allClasses} />

        {/* manage new student */}
        <div className="p-4 ring-1 ring-neutral-700 rounded-xl flex gap-4">
          <div className="flex-1 p-4 flex flex-col gap-4 rounded-xl bg-neutral-900">
            <div className="text-lg">New Student</div>
            <ManageStudent />
          </div>

          <div className="flex-1 p-4 flex flex-col gap-4 rounded-xl bg-neutral-900">
            <div className="text-lg">Recent Activity</div>
            <div></div>
          </div>
        </div>

        {/* quick action students */}
        <div className="ring-1 ring-neutral-700 rounded-xl p-4">
          <div className="flex flex-col gap-4 p-4 bg-neutral-900 rounded-xl">
            <div>
              <div className="text-lg">Quick Action</div>
              <div className="text-neutral-500 text-sm">Manage Students</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {allClasses.map((val, index) => (
                <div
                  key={index}
                  className="p-4 ring-1 ring-neutral-700 rounded-md flex flex-col gap-2"
                >
                  <div className="text-lg">
                    Class {val.name}
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

export default ClassesDashboard;
