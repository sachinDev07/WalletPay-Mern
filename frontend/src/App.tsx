import { Outlet, useLocation } from "react-router-dom";

import Header from "./components/Header";

function App() {
  const location = useLocation();
  const displayHeader = !["/", "/signin"].includes(location.pathname);
  return (
    <>
      {displayHeader && <Header />}
      <Outlet />
    </>
  );
}

export default App;
