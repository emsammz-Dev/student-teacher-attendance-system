import Link from "next/link";

function TimeTableThumbnail() {
  return (
    <>
      <div className="flex-1 p-4 flex gap-2 justify-between items-center bg-neutral-900 rounded-xl">
        <div className="text-lg">TimeTable</div>

        <div>
          <Link
            className="hover:bg-teal-800 bg-neutral-800 text-teal-600 hover:text-white rounded-md text-center p-2"
            href={"/timetables"}
          >
            Active TimeTable
          </Link>
        </div>
      </div>
    </>
  );
}

export default TimeTableThumbnail;
