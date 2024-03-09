import { useContext } from "react";
import { FaBell } from "react-icons/fa";

import NotificationModal from "./NotificationModal";
import { NotificationContext } from "../context/NotificationProvider";

const NotificationIcon = () => {
  const { setNotificationToggle } = useContext(NotificationContext);
  return (
    <section className="relative">
      <button
        type="button"
        onClick={() => setNotificationToggle((prev) => !prev)}
        className="mt p-2 hover:bg-slate-200 rounded-full transition duration-150 ease-in-out"
      >
        <FaBell className="text-xl" />
      </button>
      <NotificationModal />
    </section>
  );
};

export default NotificationIcon;
