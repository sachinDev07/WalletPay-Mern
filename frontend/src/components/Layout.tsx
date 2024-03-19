import { useContext, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Toast from "./Toast";
import Header from "./Header";
import { UserProfileModalContext } from "../context/UserProfileContext";
import { NotificationContext } from "../context/NotificationProvider";

const Layout = () => {
  const location = useLocation();
  const displayHeader = !["/signup", "/login"].includes(location.pathname);
  const { setUserProfileToggle } = useContext(UserProfileModalContext);
  const { setNotificationToggle } = useContext(NotificationContext);

  const layoutRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (layoutRef.current) {
      setUserProfileToggle(false);
      setNotificationToggle(false);
    }
  };
  return (
    <main ref={layoutRef} onClick={handleClick}>
      {displayHeader && <Header />}
      <Outlet />
      <Toast />
    </main>
  );
};

export default Layout;
