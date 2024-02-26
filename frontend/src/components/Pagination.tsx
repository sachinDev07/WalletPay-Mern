import { FaGreaterThan, FaLessThan } from "react-icons/fa6";

interface PaginationProps {
  onClick: (selectedPage: number) => void;
  totalPages: number;
  page: number;
}

const Pagination = ({ onClick, totalPages, page }: PaginationProps) => {
  return (
    <div className="absolute w-[250px] right-1/2 left-1/2 -translate-x-1/2 bottom-[15%] flex items-center justify-center gap-2">
      <FaLessThan
        onClick={() => onClick(page - 1)}
        className={`${
          page > 1
            ? "block cursor-pointer hover:text-slate-900 transition duration-150 ease-in-out"
            : "opacity-0"
        } text-slate-700 text-xl  mr-2 `}
      />

      {[...Array.from({ length: totalPages })].map((_, i) => {
        return (
          <span
            key={i}
            onClick={() => onClick(i + 1)}
            className={`py-1 px-3 cursor-pointer text-xl ${
              page === i + 1
                ? "border-[3px] border-black rounded-md font-bold"
                : "font-medium"
            }`}
          >
            {i + 1}
          </span>
        );
      })}

      <FaGreaterThan
        onClick={() => onClick(page + 1)}
        className={`${
          page < totalPages
            ? "block hover:text-slate-900 transition duration-150 ease-in-out cursor-pointer"
            : "opacity-0"
        }  text-slate-700 text-xl ml-2`}
      />
    </div>
  );
};

export default Pagination;
