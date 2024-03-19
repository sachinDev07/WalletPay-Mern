import { useContext, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import NotificationModal from "./NotificationModal";
import { NotificationContext } from "../context/NotificationProvider";
import axios from "../api/axios";

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

const NotificationIcon = () => {
  const { setNotificationToggle } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotificatonCount, setUnreadNotificatonCount] = useState<number>(0);

  const getNotifications = async () => {
    try {
      const response = await axios.get<ApiResponse>("/notifications",);
      setNotifications(response.data?.notifications);
      const unreadCount = response.data?.notifications.filter(
        (notification) => !notification.read,
      ).length;
      setUnreadNotificatonCount(unreadCount);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const markNotificationsAsRead = async () => {
    const notificationIds: string[] = notifications.map(
      (notification) => notification._id,
    );
    try {
      await axios.post("/notifications/mark-as-read", { notificationIds });
      getNotifications();
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(async () => {
      getNotifications();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative">
      <button
        type="button"
        onClick={() => {
          markNotificationsAsRead();
          setNotificationToggle((prev) => !prev);
        }}
        className="mt p-2 hover:bg-slate-200 rounded-full transition duration-150 ease-in-out active:bg-slate-300"
      >
        <FaBell className="text-xl" />
      </button>
      {unreadNotificatonCount !== 0 && (
        <div className="absolute top-[3px] left-[19px] w-4 h-4 rounded-full flex justify-center items-center text-[10px] font-bold bg-red-100 border-red-300 border-2">
          {unreadNotificatonCount}
        </div>
      )}
      <NotificationModal notifications={notifications} />
    </section>
  );
};

export default NotificationIcon;
