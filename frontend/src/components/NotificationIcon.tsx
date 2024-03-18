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

  const getNotifications = async () => {
    try {
      const response = await axios.get<ApiResponse>("/notifications", {
        withCredentials: true,
      });
      setNotifications(response.data?.notifications);
    } catch (error) {
      console.error(error);
      return null;
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
        onClick={() => setNotificationToggle((prev) => !prev)}
        className="mt p-2 hover:bg-slate-200 rounded-full transition duration-150 ease-in-out active:bg-slate-300"
      >
        <FaBell className="text-xl" />
      </button>
      <NotificationModal notifications={notifications} />
    </section>
  );
};

export default NotificationIcon;
