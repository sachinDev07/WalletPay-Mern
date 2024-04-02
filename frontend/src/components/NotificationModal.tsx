import { useContext } from "react";
import { FaXmark } from "react-icons/fa6";

import Notification from "./Notification";
import { NotificationContext } from "../context/NotificationProvider";
import { handleDate } from "../utils/handleDate";

type SenderDetails = {
  firstname: string;
};

interface Notification {
  _id: string;
  amount: number;
  createdAt: string;
  senderDetails: SenderDetails;
}

type NotificationModalProps = {
  notifications: Notification[];
  getNotifications: () => void;
};

const NotificationModal = ({
  getNotifications,
  notifications,
}: NotificationModalProps) => {
  const { notificationToggle, setNotificationToggle } =
    useContext(NotificationContext);

  return (
    notificationToggle && (
      <div className={"relative"}>
        <div id="talkbubble" className="text-gray-100 dark:text-gray-500"></div>
        <div className="absolute top-4 left-1/2 right-1/2 -translate-x-1/2 bg-gray-100 w-[300px] rounded-md p-2 shadow-black dark:bg-slate-800 dark:border-2 dark:shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium dark:text-white">
              Notifications
            </span>
            <button
              type="button"
              onClick={() => setNotificationToggle((prev) => !prev)}
              className="p-[4px] bg-slate-300 hover:bg-slate-400 hover:text-white transition duration-150 ease-in-out rounded-full"
            >
              <FaXmark />
            </button>
          </div>
          <div className="mt-2 overflow-auto max-h-[250px] notification_modal">
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
              <p className="dark:text-center dark:text-white">
                No messages are present
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default NotificationModal;
