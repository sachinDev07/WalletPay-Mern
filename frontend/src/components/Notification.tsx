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
        read ? "bg-gray-200" : "bg-gray-400"
      } mt-2 p-1 flex justify-between items-center rounded-md`}
    >
      <div className="flex items-center justify-between">
        <CharacterLogo
          character={name.charAt(0).toUpperCase()}
          width="w-6"
          height="h-6"
          bgColor="bg-slate-300"
          textColor="text-black"
          textSize="text-sm"
        />
        <div className="w-[220px] ml-2">
          <p className="text-xs font-medium text-wrap">
            You have received Rs. {amount} from {name} on {date}.
          </p>
        </div>
      </div>
      <div className="text-center flex flex-col justify-between gap-[4px]">
        <button
          className="p-[4px] text-sm bg-slate-300 hover:bg-slate-400 active:bg-slate-300 rounded-full"
          title="Delete"
        >
          <MdOutlineDeleteOutline />
        </button>
        <button
          className="p-[4px] text-sm bg-slate-300 hover:bg-slate-400 active:bg-slate-300 rounded-full"
          title="Mark as read"
        >
          <IoCheckmarkDoneSharp />
        </button>
      </div>
    </div>
  );
};

export default Notification;
