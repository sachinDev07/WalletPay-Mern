import { MdOutlineDeleteOutline } from "react-icons/md";
import CharacterLogo from "./CharacterLogo";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

type NotificationType = {
  amount: number;
  name: string;
  read: boolean;
  date: string;
};

const Notification = ({ amount, name, read, date }: NotificationType) => {
  return (
    <div
      className={`${
        read ? "bg-gray-200" : "bg-gray-300"
      } mt-2 p-1 flex justify-between items-center rounded-md`}
    >
      <div className="flex items-center justify-between">
        <CharacterLogo
          character={name.charAt(0).toUpperCase()}
          width="w-6"
          height="h-6"
          bgColor="bg-slate-400"
          textColor="text-black"
          textSize="text-sm"
        />
        <div className="w-[220px] ml-2">
          <p className="text-xs font-medium text-wrap">
            You have received Rs.
            <span className="font-bold">{amount}</span> from{" "}
            <span className="font-bold">{name}</span> on{" "}
            <span className="font-bold">{date}</span>.
          </p>
        </div>
      </div>
      <div className="text-center flex flex-col justify-between gap-[4px]">
        <button
          className="p-[4px] text-sm bg-slate-300 hover:text-white hover:bg-slate-400 active:text-black  rounded-full"
          title="Delete"
        >
          <MdOutlineDeleteOutline />
        </button>
        <button
          className="p-[4px] text-sm bg-slate-300 hover:text-white hover:bg-slate-400 active:text-black rounded-full"
          title="Mark as read"
        >
          <IoCheckmarkDoneSharp />
        </button>
      </div>
    </div>
  );
};

export default Notification;
