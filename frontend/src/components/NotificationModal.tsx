import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { FaXmark } from "react-icons/fa6";

import Notification from "./Notification";
import { NotificationContext } from "../context/NotificationProvider";
import { handleDate } from "../utils/handleDate";

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
  const { notificationToggle, setNotificationToggle } =
    useContext(NotificationContext);

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

  return (
    notificationToggle && (
      <div className="relative">
        <div id="talkbubble" className="text-gray-100"></div>
        <div className="absolute top-4 left-1/2 right-1/2 -translate-x-1/2 bg-gray-100 w-[300px] rounded-md p-2 shadow-black">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">Notifications</span>
            <button
              type="button"
              onClick={() => setNotificationToggle((prev) => !prev)}
              className="p-[4px] bg-slate-300 hover:bg-slate-400 hover:text-white transition duration-150 ease-in-out rounded-full"
            >
              <FaXmark />
            </button>
          </div>
          <div className="mt-2 overflow-auto max-h-[250px] notification_modal">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Notification
                  key={notification?._id}
                  id={notification?._id}
                  amount={notification?.amount}
                  name={notification?.senderDetails?.firstname}
                  read={notification?.read}
                  date={handleDate(notification?.createdAt)}
                />
              ))
            ) : (
              <p className="text-center font-medium">No messages are present</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationModal;
