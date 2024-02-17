import { Outlet, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Header from "./components/Header";
import Toast from "./components/Toast";

function App() {
  const location = useLocation();
  const displayHeader = !["/", "/signin"].includes(location.pathname);
  return (
    <RecoilRoot>
      {displayHeader && <Header />}
      <Outlet />
      <Toast />
    </RecoilRoot>
  );
}

export default App;
