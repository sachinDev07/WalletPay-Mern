import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import { UserProfileModalContext } from "../context/UserProfileContext";
import { NotificationContext } from "../context/NotificationProvider";
import ShowProfileProvider from "../context/ShowProfileContext";
import { ThemeProvider } from "../context/ThemeContext";

const Layout = () => {
  const location = useLocation();
  const displayHeader = !["/signup", "/login"].includes(location.pathname);
  const { setUserProfileToggle } = useContext(UserProfileModalContext);
  const { setNotificationToggle } = useContext(NotificationContext);
  const [themeMode, setThemeMode] = useState<string>("light");

  const layoutRef = useRef<HTMLDivElement>(null);

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html")?.classList.remove("light", "dark");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  const handleClick = () => {
    if (layoutRef.current) {
      setUserProfileToggle(false);
      setNotificationToggle(false);
    }
  };

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <main
        ref={layoutRef}
        onClick={handleClick}
        className="h-screen dark:bg-black"
      >
        {displayHeader && (
          <ShowProfileProvider>
            <Header />
          </ShowProfileProvider>
        )}
        <Outlet />
      </main>
    </ThemeProvider>
  );
};

export default Layout;
