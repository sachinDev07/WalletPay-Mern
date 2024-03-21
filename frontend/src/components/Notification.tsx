import { MdOutlineDeleteOutline } from "react-icons/md";

import CharacterLogo from "./CharacterLogo";
import axios from "../api/axios";

type NotificationType = {
  id: string;
  amount: number;
  name: string;
  date: string;
  refreshNotifications: () => void;
};

const Notification = ({ id, amount, name, date, refreshNotifications }: NotificationType) => {
  const deleteNotification = async (id: string) => {
    try {
      await axios.delete("/notifications/delete", {
        data: { id },
      });
      refreshNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`mt-2 p-1 flex justify-between items-center rounded-md bg-gray-200`}
    >
      <div className="flex items-center justify-between">
        <CharacterLogo
          character={name.charAt(0).toUpperCase()}
          width="w-6"
          height="h-6"
          bgColor="bg-slate-300"
          textColor="text-black"
          textSize="text-lg md:text-sm"
        />
        <div className="w-[260px] md:w-[220px] ml-3 md:ml-2">
          <p className="text-sm md:text-xs font-medium text-wrap">
            You have received Rs.
            <span className="font-bold">{amount}</span> from{" "}
            <span className="font-bold">{name}</span> on{" "}
            <span className="font-bold">{date}</span>
          </p>
        </div>
      </div>
      <div className="text-center flex flex-col justify-between gap-[4px]">
        <button
          onClick={() => deleteNotification(id)}
          className="p-[4px] text-lg md:text-sm bg-slate-300 hover:text-white hover:bg-slate-400 active:text-black  rounded-full"
          title="Delete"
        >
          <MdOutlineDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default Notification;
