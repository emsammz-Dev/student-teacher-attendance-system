"use client";

import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function TopNavbar() {
  const [time, setTime] = useState("");
  const date = new Date();
  const todayDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // useEffect(() => {
  //   const updateTime = () => {
  //     setTime(
  //       date.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       })
  //     );
  //   };

  //   updateTime(); // Set initial time
  //   const interval = setInterval(updateTime, 60000);
  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div className="h-12 sticky top-0 text-xl flex justify-between items-center bg-teal-950">
      <div className="flex items-center">
        <div className="text-xl">EM-SCHOOL</div>
      </div>
      <div className="flex gap-1 pe-4">
        <span>{days[date.getDay()]},</span>
        <div className="flex gap-1 text-stone-400">
          <span>{months[date.getMonth()]}</span>
          <span>{date.getDate()}</span>
        </div>

        {/* <span>{time}</span> */}
      </div>
    </div>
  );
}

export default TopNavbar;
