import { useContext, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Toast from "./Toast";
import { UserProfileModalContext } from "../context/UserProfileContext";

const Layout = () => {
  const location = useLocation();
  const displayHeader = !["/signup", "/login"].includes(location.pathname);
  const { setUserProfileToggle } = useContext(UserProfileModalContext);

  const layoutRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (layoutRef.current) {
      setUserProfileToggle(false);
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
