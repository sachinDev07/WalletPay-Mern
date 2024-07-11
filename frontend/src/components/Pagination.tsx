import { FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { nextButton, onPageButton, prevButton } from "../redux/paginationSlice";

const Pagination = () => {
  const { page, totalPages } = useAppSelector((store) => store.pagination);
  const dispatch = useAppDispatch();
  return (
    <div className="absolute w-[260px] right-1/2 left-1/2 -translate-x-1/2 bottom-[10%] flex items-center justify-center gap-2">
      <FaLessThan
        onClick={() => dispatch(prevButton())}
        className={`${
          page > 1
            ? "block cursor-pointer hover:text-slate-900 transition duration-150 ease-in-out"
            : "opacity-0"
        } text-slate-700 text-sm md:text-lg  mr-2 dark:text-white`}
      />

      {[...Array.from({ length: totalPages })].map((_, i) => {
        return (
          <span
            key={i}
            onClick={() => dispatch(onPageButton(i + 1))}
            className={`py-1 px-3 cursor-pointer text-sm md:text-xl ${
              page === i + 1
                ? "border-[3px] border-black dark:border-white dark:text-white rounded-md font-bold"
                : "font-medium dark:text-gray-300"
            }`}
          >
            {i + 1}
          </span>
        );
      })}

      <FaGreaterThan
        onClick={() => dispatch(nextButton())}
        className={`${
          page < totalPages
            ? "block hover:text-slate-900 transition duration-150 ease-in-out cursor-pointer"
            : "opacity-0"
        }  text-slate-700 text-sm md:text-lg ml-2 dark:text-white`}
      />
    </div>
  );
};

export default Pagination;
