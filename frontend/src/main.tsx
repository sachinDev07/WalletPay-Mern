import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "./redux/store.ts";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Provider } from "react-redux";
import { NotificationProvider } from "./context/NotificationProvider.tsx";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <AuthProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <RecoilRoot>
              <BrowserRouter>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </BrowserRouter>
            </RecoilRoot>
          </NotificationProvider>
        </QueryClientProvider>
      </Provider>
    </AuthProvider>
  </AuthProvider>,
);
