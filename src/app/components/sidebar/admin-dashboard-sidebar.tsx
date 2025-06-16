"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { ImFlickr, ImFlickr2 } from "react-icons/im";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { RiHomeOfficeLine, RiLogoutCircleLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";

function AdminDashBoardSideBar() {
  const pathName = usePathname();
  const [showSideBar, setShowSideBar] = useState(false);

  const shortLinks = [
    {
      name: "Dashboard",
      shortName: "Home",
      link: "/",
      icon: RiHomeOfficeLine,
    },
    {
      name: "Classes",
      shortName: "CL",
      link: "/classes",
      icon: SiGoogleclassroom,
    },
    {
      name: "Teachers",
      shortName: "TE",
      link: "/teachers",
      icon: FaChalkboardTeacher,
    },
    {
      name: "Students",
      shortName: "ST",
      link: "/students",
      icon: PiStudentBold,
    },
    {
      name: "Subjects",
      shortName: "SU",
      link: "/subjects",
      icon: IoBookOutline,
    },
  ];

  const shortLinkMap = shortLinks.map((val) => {
    if (val.link == pathName) {
      return {
        ...val,
        linkClass: "text-green-400",
      };
    } else {
      return {
        ...val,
        linkClass: "text-stone-500  hover:text-emerald-500",
      };
    }
  });

  return (
    <>
      <div className="h-screen sticky top-0 flex flex-col w-16 bg-teal-950">
        <div className="flex flex-col">
          <div className="flex justify-center items-center h-12">
            <button
              type="button"
              className="hover:bg-gray-600/40 cursor-pointer p-1 rounded-full"
              onClick={() => setShowSideBar(true)}
            >
              <FiMenu size={25} />
            </button>
          </div>
          {shortLinkMap.map((val, index) => (
            <Link
              key={index}
              href={val.link}
              className={`flex flex-col items-center p-2 text-xs ${val.linkClass}`}
            >
              <div>
                <val.icon size={25} />
              </div>
              <div className="content-end">{val.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showSideBar && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%", opacity: 0 }} // Exit animation
            transition={{
              animate: { duration: 2, ease: "easeOut" }, // Open speed
              exit: { duration: 0.2, ease: "easeIn" }, // Close speed
            }}
            className="fixed top-0 left-0 bottom-0 w-64 bg-stone-800  border-r-[1px] border-stone-700 z-50 flex flex-col"
          >
            {/* menu and logo */}
            <div className="flex items-center">
              <div className="h-12 w-16 content-center place-items-center">
                <FiMenu
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setShowSideBar(false)}
                />
              </div>
              <div className="text-xl">EM-SCHOOL</div>
            </div>

            {/* navigation tabs with auto overflow scroll*/}
            <div className="flex-1 flex flex-col overflow-auto">
              {/* use detail */}
              <div className="flex flex-col border-b-[1px] border-stone-700">
                {shortLinkMap.map((val, index) => (
                  <Link
                    key={index}
                    href={val.link}
                    className={`flex items-center text-lg h-12 ${val.linkClass}`}
                  >
                    <val.icon size={25} className="w-16" />
                    <div>{val.name}</div>
                  </Link>
                ))}
              </div>

              {/* time table and holiday */}
              <div className="border-b-[1px] border-stone-700">
                <div className="flex items-center h-12">
                  <MdOutlineTimer size={30} className="w-16" />
                  <span>Timetable</span>
                </div>

                <div className="flex items-center h-12">
                  <CiCalendarDate size={30} className="w-16" />
                  <span>Holiday</span>
                </div>
              </div>

              {/* extra div to see scroll */}
              <div className="h-[500px]">lorem</div>
              {/* logout */}
              <div className="flex flex-col">
                <button className="flex items-center h-12  border-y-[1px] border-stone-700">
                  <RiLogoutCircleLine size={30} className="w-16" />
                  <span>Logout</span>
                </button>

                <div className="flex items-center justify-around gap-2 h-28 bg-stone-900">
                  <CgProfile className="text-slate-400" size={50} />
                  <div className="text-slate-500">
                    <div>Administor</div>
                    <div className="text-neutral-400 text-sm">Admin-1</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdminDashBoardSideBar;
