import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { FaXmark } from "react-icons/fa6";

import Notification from "./Notification";
import { NotificationContext } from "../context/NotificationProvider";
import { handleDate } from "../utils/handleDate";
import { useQuery } from "@tanstack/react-query";

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
  const { notificationToggle, setNotificationToggle } =
    useContext(NotificationContext);

  const getNotification = async () => {
    const response = await axios.get<ApiResponse>("/notifications", {
      withCredentials: true,
    });
    return response.data;
  };

  const { data: notifications, refetch } = useQuery<ApiResponse, Error>({
    queryKey: ["notifications"],
    queryFn: getNotification,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [refetch]);

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
            {notifications?.notifications?.length &&
            notifications?.notifications?.length > 0 ? (
              notifications?.notifications?.map((notification) => (
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
              <p>No messages are present</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationModal;
