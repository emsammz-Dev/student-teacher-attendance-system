import Link from "next/link";
import ManageClasses from "./components/classescomponent/manage_classes/manage_classes";
import ClassThumbnail from "./components/classescomponent/admin_dashboard_class_thumbnail";
import TeacherThumbnail from "./components/teacherscomponent/admin_dashboard_teacher_thumbnail";
import ManageTeachers from "./components/teacherscomponent/manage_teachers/manage_teachers";
import StudentThumbnail from "./components/studentscomponent/admin_dashboard_student_thumbnail";
import SubjectThumbnail from "./components/subjectscomponent/admin_dashboard_subjects_thumnail";
import ManageSubjects from "./components/subjectscomponent/manage_subjects";
import HolidayThumbnail from "./components/holidaycomponent/admin_dashboard_holiday_thumbnail";
import TimeTableThumbnail from "./components/timetablecomponent/admin_dashboard_timetable_thumbnail";
import ManageStudent from "./components/studentscomponent/manage_students";

// const cards = [
//   {
//     cardName: "students",
//     cardPath: "/dashboard/students/actions",
//     cardDashboard: "/students",
//   },
//   {
//     cardName: "teachers",
//     cardPath: "/dashboard/teachers/actions",
//     cardDashboard: "/teachers",
//   },
//   {
//     cardName: "classes",
//     cardPath: "/dashboard/classes/actions",
//     cardDashboard: "/classes",
//   },
//   {
//     cardName: "subjects",
//     cardPath: "/dashboard/subjects/actions",
//     cardDashboard: "/subjects",
//   },
//   {
//     cardName: "holidays",
//     cardPath: "/dashboard/holidays",
//     cardDashboard: "/holidays",
//   },
//   {
//     cardName: "timetable",
//     cardPath: "/dashboard/timetable",
//     cardDashboard: "/timetable",
//   },
// ];

async function Dashboard() {
  return (
    <>
      {/* right */}
      <div className="p-4 flex flex-col gap-2 bg-teal-950">
        <div className="flex flex-col gap-4">
          {/* heading */}
          <div className="p-4 ring-1 ring-neutral-700 rounded-xl flex flex-col gap-4">
            <div className="bg-neutral-900 flex p-4 rounded-xl shadow-md shadow-black">
              <div className="flex-1">
                <div className="text-2xl">Admin Dashboard</div>
                <div className="text-md text-stone-500">
                  Lorem ipsum dolor sit amet Lorem ipsum.
                </div>
              </div>
              <div className="flex-1 content-center place-items-center">
                <div className="flex gap-2">
                  <input
                    className="border-[1px] border-teal-700 rounded-xl h-8 focus:border-teal-500 focus:outline-none"
                    type="input"
                  ></input>
                  <button className="border-[1px] border-teal-500 rounded-xl px-2">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* dashboard */}
          <div className="p-4 ring-1 ring-neutral-700 rounded-xl flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4">
              <ClassThumbnail />
              <TeacherThumbnail />
              <StudentThumbnail />
              <SubjectThumbnail />
            </div>
            <div className="flex gap-4">
              <HolidayThumbnail />
              <TimeTableThumbnail />
            </div>
          </div>
        </div>
        <div className="flex gap-4 p-4 ring-1 ring-neutral-700 rounded-xl">
          {/* quick action */}
          <div className="flex-1 bg-neutral-900 rounded-xl shadow-md shadow-black p-4 flex flex-col gap-4">
            <div className="text-xl">Quick Action</div>
            <div className="grid grid-cols-2 gap-4">
              <ManageClasses />
              <ManageTeachers />
              <ManageStudent />
              <ManageSubjects />
            </div>
          </div>
          <div className="flex-1 bg-neutral-900 rounded-xl shadow-md shadow-black p-4">
            <div className="text-xl">Recent Activity</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

function Login() {
  return (
    <div className="h-screen relative bg-neutral-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] border-[1px] rounded-sm flex flex-col justify-around p-4">
        <div className="text-center text-2xl">School Attendance System</div>
        <div className="flex flex-col">
          <div>Select Role</div>
          <select className="border-[1px] h-10 rounded-sm p-2">
            <option>Administer</option>
            <option>Teacher</option>
          </select>
        </div>
        <div className="flex flex-col">
          <div>Select User</div>
          <select className="border-[1px] h-10 rounded-sm p-2">
            <option>Admin User</option>
            <option>teacher</option>
          </select>
        </div>

        <button className="bg-neutral-700 h-10 rounded-sm">
          <Link href={"/dashboard"}>Submit</Link>
        </button>
      </div>
    </div>
  );
}
