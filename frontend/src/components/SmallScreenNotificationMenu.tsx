import { useContext } from "react";
import { FaXmark } from "react-icons/fa6";

import Notification from "./Notification";
import { NotificationContext } from "../context/NotificationProvider";
import { handleDate } from "../utils/handleDate";
import noMessageImg from "../assets/img/noMessage.png";

type SenderDetails = {
  firstname: string;
};

interface Notification {
  _id: string;
  amount: number;
  read: boolean;
  createdAt: string;
  senderDetails: SenderDetails;
}

type NotificationModalProps = {
  notifications: Notification[];
  getNotifications: () => void;
};

const SmallScreenNotificationMenu = ({
  getNotifications,
  notifications,
}: NotificationModalProps) => {
  const { notificationToggle, setNotificationToggle } =
    useContext(NotificationContext);

  return (
    notificationToggle && (
      <div className="absolute top-0 left-0 right-0 w-screen h-screen z-10 bg-gray-100 dark:bg-slate-800">
        <div className="absolute top-0 w-full p-3 sm:pt-4 sm:px-14 md:px-2 rounded-md shadow-black">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium dark:text-white">
              Notifications
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setNotificationToggle(false);
              }}
              className="p-[4px] bg-slate-300 hover:bg-slate-400 hover:text-white transition duration-150 ease-in-out rounded-full"
            >
              <FaXmark />
            </button>
          </div>
          <div className="mt-2 overflow-auto max-h-[calc(100vh-5rem)] notification_modal">
            {notifications?.length && notifications?.length > 0 ? (
              notifications?.map((notification) => (
                <Notification
                  key={notification._id}
                  id={notification._id}
                  amount={notification?.amount}
                  name={notification?.senderDetails?.firstname}
                  date={handleDate(notification?.createdAt)}
                  refreshNotifications={getNotifications}
                />
              ))
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={noMessageImg}
                  alt="No new messages found"
                  className="mt-8"
                />
                <p className="text-center -mt-8 dark:text-white">No messages are present</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SmallScreenNotificationMenu;
