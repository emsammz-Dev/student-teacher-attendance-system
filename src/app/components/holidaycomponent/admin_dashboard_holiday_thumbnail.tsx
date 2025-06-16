import Link from "next/link";

function HolidayThumbnail() {
  return (
    <>
      <div className="flex-1 p-4 flex justify-between items-center bg-neutral-900 rounded-xl">
        <div className="text-lg uppercase">Holiday</div>

        <div>
          <Link
            className="hover:bg-teal-800 bg-neutral-800 text-teal-600 hover:text-white rounded-md text-center p-2"
            href={"/holidays"}
          >
            Next Holidays
          </Link>
        </div>
      </div>
    </>
  );
}

export default HolidayThumbnail;
