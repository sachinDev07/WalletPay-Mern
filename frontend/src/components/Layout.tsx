import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Toast from "./Toast";

const Layout = () => {
  const location = useLocation();
  const displayHeader = !["/signup", "/login"].includes(location.pathname);
  return (
    <main>
      {displayHeader && <Header />}
      <Outlet />
      <Toast />
    </main>
  );
};

export default Layout;
