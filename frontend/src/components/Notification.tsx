import { MdOutlineDeleteOutline } from "react-icons/md";

import CharacterLogo from "./CharacterLogo";
import axiosInstance from "../api/axios";

type NotificationType = {
  id: string;
  amount: number;
  name: string;
  date: string;
  refreshNotifications: () => void;
};

const Notification = ({
  id,
  amount,
  name,
  date,
  refreshNotifications,
}: NotificationType) => {
  const deleteNotification = async (id: string) => {
    try {
      await axiosInstance.delete("/notifications/delete", {
        data: { id },
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
      refreshNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`mt-2 p-1 rounded-md bg-gray-200`}>
      <div className="flex items-center justify-between space-x-4 md:space-x-2">
        <CharacterLogo
          character={name.charAt(0).toUpperCase()}
          width="w-9 md:w-9"
          height="h-6 md:h-6"
          bgColor="bg-slate-300 dark:bg-slate-400"
          textColor="text-black"
          textSize="md:text-sm"
        />
        <div className="">
          <p className="text-sm md:text-xs font-medium text-wrap">
            You have received Rs.
            <span className="font-bold">{amount}</span> from{" "}
            <span className="font-bold">{name}</span> on{" "}
            <span className="font-bold">{date}</span>
          </p>
        </div>
        <div className="text-center flex flex-col justify-between">
          <button
            onClick={() => deleteNotification(id)}
            className="p-[4px] text-lg md:text-sm bg-slate-300 hover:text-white hover:bg-slate-400 active:text-black rounded-full dark:bg-slate-400 dark:hover:bg-slate-600"
            title="Delete"
          >
            <MdOutlineDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
