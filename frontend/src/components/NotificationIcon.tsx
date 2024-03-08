import { FaBell } from "react-icons/fa";
import NotificationModal from "./NotificationModal";

const NotificationIcon = () => {
  return (
    <section className="relative">
      <button type="button" className="mt-2">
        <FaBell className="text-xl" />
      </button>
      <NotificationModal />
    </section>
  );
};

export default NotificationIcon;
