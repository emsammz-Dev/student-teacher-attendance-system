import { getAllSubject } from "@/actions/prisma_actions";
import ManageSubjectsQuickAction from "./subjects_components/manage_subject_quick_action";

interface AccType {
  [key: string]: string[];
}

async function SubjectsDashboard() {
  const allSubjects = await getAllSubject();
  // console.log(allSubjects);
  const subjectsReduced = allSubjects.reduce((acc, detail) => {
    if (!acc[detail.subjectName]) {
      acc[detail.subjectName] = [];
    }
    acc[detail.subjectName] = [...acc[detail.subjectName], detail.subjectCode];
    return acc;
  }, {} as AccType);

  return (
    <>
      <div className="p-8 flex flex-col gap-6">
        <div>
          <div className="text-3xl uppercase">subjects Dashboard</div>
          <div className="text-lg text-neutral-500">
            Lorem ipsum dolor sit amet consectetur.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {Object.keys(subjectsReduced).map((val, index) => (
            <div
              key={index}
              className="p-4 bg-neutral-800 rounded-sm flex flex-col gap-2"
            >
              <div className="text-xl uppercase">{val}</div>
              <div className="flex flex-wrap gap-2">
                {subjectsReduced[val].map((val, index) => (
                  <div
                    key={index}
                    className="bg-neutral-900 h-8 w-20 px-2 rounded-md content-center text-center"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* quick action */}
        <div className="p-4 border-[1px] border-neutral-700 rounded-lg flex flex-col gap-4">
          <div>
            <div className="text-xl uppercase">quick action</div>
            <div className="text-neutral-500">Manage Subjects</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-800 rounded-lg">
              <div className="text-lg uppercase">new SUbject</div>
              <ManageSubjectsQuickAction key={"add_new_subject"} val={"new"} />
            </div>
            {Object.keys(subjectsReduced).map((val, index) => (
              <div key={index} className="p-4 bg-neutral-800 rounded-lg">
                <div className="text-lg uppercase">{val}</div>
                <ManageSubjectsQuickAction key={index} val={val} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectsDashboard;
