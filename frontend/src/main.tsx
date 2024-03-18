import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import store from "./redux/store.ts";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Provider } from "react-redux";
import { NotificationProvider } from "./context/NotificationProvider.tsx";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <Provider store={store}>
        <NotificationProvider>
          <RecoilRoot>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </RecoilRoot>
        </NotificationProvider>
    </Provider>
  </AuthProvider>,
);
