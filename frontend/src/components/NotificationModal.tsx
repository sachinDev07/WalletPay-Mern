import { useEffect, useState } from "react";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import Notification from "./Notification";

const NotificationModal = () => {
  const [notification, setNotifications] = useState(null);

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7001/api/v1/notifications",
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="absolute top-10 left-1/2 right-1/2 -translate-x-1/2 bg-gray-100 w-[300px] h-[300px] rounded-md p-2 ">
      <div className="flex justify-between items-center">
        <span className="text-black font-medium">Notifications</span>
        <button
          type="button"
          className="p-[4px] bg-slate-300 hover:bg-slate-400 transition duration-150 ease-in-out rounded-full"
        >
          <FaXmark />
        </button>
      </div>
      <div className="mt-2 h-[260px] notification_modal">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  );
};

export default NotificationModal;
