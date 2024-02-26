import { Outlet, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import store from "./redux/store";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Toast from "./components/Toast";

function App() {
  const location = useLocation();
  const displayHeader = !["/", "/signin"].includes(location.pathname);
  return (
    <Provider store={store}>
      <RecoilRoot>
        {displayHeader && <Header />}
        <Outlet />
        <Toast />
      </RecoilRoot>
    </Provider>
  );
}

export default App;
