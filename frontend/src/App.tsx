import { Outlet, useLocation } from "react-router-dom";
import { RecoilRoot } from "recoil";
import store from "./redux/store";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Toast from "./components/Toast";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  const location = useLocation();
  const displayHeader = !["/signup", "/login"].includes(location.pathname);
  return (
    <AuthProvider>
      <Provider store={store}>
        <RecoilRoot>
          {displayHeader && <Header />}
          <Outlet />
          <Toast />
        </RecoilRoot>
      </Provider>
    </AuthProvider>
  );
}

export default App;
