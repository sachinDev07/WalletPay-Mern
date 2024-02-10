import { Outlet, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Toast from "./components/Toast";

function App() {
  const location = useLocation();
  const displayHeader = !["/", "/signin"].includes(location.pathname);
  return (
    <>
      {displayHeader && <Header />}
      <Outlet />
      <Toast />
    </>
  );
}

export default App;
