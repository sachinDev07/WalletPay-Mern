import { useContext, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import NotificationModal from "./NotificationModal";
import { NotificationContext } from "../context/NotificationProvider";
import { UserProfileModalContext } from "../context/UserProfileContext";
import useMediaQuery from "../hooks/useMediaQuery";
import SmallScreenNotificationMenu from "./SmallScreenNotificationMenu";
import axiosInstance from "../api/axios";

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
  const [unreadNotificatonCount, setUnreadNotificatonCount] =
    useState<number>(0);
  const { setUserProfileToggle } = useContext(UserProfileModalContext);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");

  const getNotifications = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse>("/notifications", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
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
      await axiosInstance.post("/notifications/mark-as-read", { notificationIds }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        }
      });
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
    <>
      <section className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            markNotificationsAsRead();
            setNotificationToggle((prev) => !prev);
            setUserProfileToggle(false);
          }}
          className="mt p-[5px] bg-slate-200 hover:bg-slate-300 rounded-full transition duration-150 ease-in-out active:bg-slate-300 dark:bg-white dark:hover:bg-slate-200"
        >
          <FaBell className="text-lg md:text-xl" />
        </button>
        {unreadNotificatonCount !== 0 && (
          <div className="absolute -top-[4px] left-[18px] w-4 h-4 rounded-full flex justify-center items-center text-[10px] font-bold bg-red-100 border-red-300 border-2 dark:border-black ">
            {unreadNotificatonCount}
          </div>
        )}
        {isAboveMediumScreens && (
          <NotificationModal
            getNotifications={getNotifications}
            notifications={notifications}
          />
        )}
      </section>

      <div onClick={(e) => e.stopPropagation()}>
        {!isAboveMediumScreens && (
          <SmallScreenNotificationMenu
            getNotifications={getNotifications}
            notifications={notifications}
          />
        )}
      </div>
    </>
  );
};

export default NotificationIcon;
