import { MdOutlineDeleteOutline } from "react-icons/md";
import CharacterLogo from "./CharacterLogo";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Notification = () => {
  return (
    <div className="mt-2 p-1 flex justify-between items-center bg-gray-200 rounded-md">
      <div className="flex items-center justify-between">
        <CharacterLogo
          character="S"
          width="w-6"
          height="h-6"
          bgColor="bg-slate-300"
          textColor="text-black"
          textSize="text-sm"
        />
        <div className="w-[220px] ml-2">
          <p className="text-xs font-medium text-wrap">
            You have received Rs 500 from ABC. dfdfdf
          </p>
        </div>
      </div>
      <div className="text-center flex flex-col justify-between gap-[4px]">
        <button
          className="p-[4px] text-sm bg-slate-300 hover:bg-slate-400  rounded-full"
          title="Delete"
        >
          <MdOutlineDeleteOutline />
        </button>
        <button
          className="p-[4px] text-sm bg-slate-300 hover:bg-slate-400 rounded-full"
          title="Mark as read"
        >
          <IoCheckmarkDoneSharp />
        </button>
      </div>
    </div>
  );
};

export default Notification;
