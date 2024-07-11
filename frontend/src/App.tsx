import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import { RootState } from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProfileModalContext } from "./context/UserProfileContext";
import { NotificationContext } from "./context/NotificationProvider";

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { setUserProfileToggle } = useContext(UserProfileModalContext);
  const { setNotificationToggle } = useContext(NotificationContext);

  const layoutRef = useRef<HTMLDivElement>(null);

  const [themeMode, setThemeMode] = useState<string>(
    localStorage.getItem("theme") || "light",
  );

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const handleClick = () => {
    if (layoutRef.current) {
      setUserProfileToggle(false);
      setNotificationToggle(false);
    }
  };


  useEffect(() => {
    localStorage.setItem("theme", themeMode);
    document.querySelector("html")?.classList.remove("light", "dark");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate("/login");
    }
  }, [authState.isLoggedIn, navigate]);

  return authState.isLoggedIn ? (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <main
        ref={layoutRef}
        onClick={handleClick}
        className="h-screen dark:bg-black"
      >
        <Header />
        <Outlet />
      </main>
    </ThemeProvider>
  ) : null;
}

export default App;
