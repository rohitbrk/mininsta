import { useContext } from "react";
import { PaginationContext } from "../App";
import { svgs } from "../utils/svgs";

const Pagination = () => {
  const { page, setPage, pageCount } = useContext(PaginationContext);
  return (
    <>
      <div className="mt-4 flex justify-center">
        <button
          className={
            page === 1
              ? "cursor-not-allowed flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mb-2"
              : "flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mb-2"
          }
          onClick={() =>
            setPage((prev) => {
              if (prev === 1) return prev;
              return prev - 1;
            })
          }
        >
          {svgs.arrowPrev}
          Prev
        </button>
        <button
          className={
            page === pageCount
              ? "cursor-not-allowed flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mb-2"
              : "flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center ml-2 mb-2"
          }
          onClick={() =>
            setPage((prev) => {
              if (prev === pageCount) return prev;
              return prev + 1;
            })
          }
        >
          Next
          {svgs.arrowNext}
        </button>
      </div>
      <hr className="h-px mx-24 mt-4 mb-1 bg-gray-300 border-0" />
    </>
  );
};

export default Pagination;
