import { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaXmark } from "react-icons/fa6";
import Notification from "./Notification";

interface SenderDetails {
  firstname: string;
}

interface Notification {
  _id: string;
  amount: number;
  read: boolean;
  createdAt: string;

  senderDetails: SenderDetails;
}

interface ApiResponse {
  notifications: Notification[];
}

const NotificationModal = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async () => {
    try {
      const response = await axios.get<ApiResponse>("/notifications", {
        withCredentials: true,
      });
      setNotifications(response.data?.notifications);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  return (
    <div className="absolute top-10 left-1/2 right-1/2 -translate-x-1/2 bg-gray-100 w-[300px] h-[300px] rounded-md p-2 shadow-black ">
      <div className="flex justify-between items-center">
        <span className="text-black font-medium text-xl">Notifications</span>
        <button
          type="button"
          className="p-[4px] bg-slate-300 hover:bg-slate-400 transition duration-150 ease-in-out rounded-full"
        >
          <FaXmark />
        </button>
      </div>
      <div className="mt-2 h-[260px] notification_modal">
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <Notification
              key={notification?._id}
              amount={notification?.amount}
              name={notification?.senderDetails?.firstname}
              read={notification?.read}
              date={handleDate(notification?.createdAt)}
            />
          ))}
      </div>
    </div>
  );
};

export default NotificationModal;
