import { getAllTeachersWithClassNSection } from "@/actions/prisma_actions";
import ManageTeachers from "../components/teacherscomponent/manage_teachers/manage_teachers";
import TeacherQuickAction from "./teachers_components/assign_subjects_quick_action";

async function TeachersDashboard() {
  const allTeachers = await getAllTeachersWithClassNSection();
  return (
    <>
      <div className="p-4 flex flex-col gap-4 bg-teal-950">
        <div className="bg-neutral-900 p-4 rounded-xl shadow-md shadow-black">
          <div className="text-xl">Teachers Dashboard</div>
          <div className="text-sm text-stone-400">
            Lorem ipsum dolor sit amet consectetur.
          </div>
        </div>

        <div className="p-4 ring-1 ring-neutral-700 rounded-xl">
          <div className="grid grid-cols-4 gap-4">
            {allTeachers.map((val, index) => (
              <div key={index} className="p-4 bg-neutral-900 rounded-xl">
                <div>
                  <div className="text-lg flex gap-1 text-slate-400">
                    <span className="">Mr/Mrs.</span>
                    <span>{val.firstName}</span>
                    <span>{val.lastName}</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="text-stone-400">Class :</div>
                    {val.classModelId ? (
                      <div className="text-stone-400">
                        <span>{val.headClass?.name}</span>
                        <span>{val.headClass?.SectionModel?.name}</span>
                      </div>
                    ) : (
                      <div>- - - - -</div>
                    )}
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="text-stone-400">Teaching Subjects :</div>
                    <div className="text-lg">{val.TeacherSubjects.length}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 ring-1 ring-neutral-700 rounded-xl flex gap-4">
          <div className="flex-1 p-4 flex flex-col gap-4 rounded-xl bg-neutral-900">
            <div className="text-lg">New Student</div>
            <ManageTeachers />
          </div>

          <div className="flex-1 p-4 flex flex-col gap-4 rounded-xl bg-neutral-900">
            <div className="text-lg">Recent Activity</div>
            <div></div>
          </div>
        </div>

        <TeacherQuickAction allTeachers={allTeachers} />
      </div>
    </>
  );
}

export default TeachersDashboard;
