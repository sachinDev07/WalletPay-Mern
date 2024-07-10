import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { NotificationProvider } from "./context/NotificationProvider.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ToastContextProvider } from "./context/ToastContext.tsx";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SendMoney from "./pages/SendMoney.tsx";
import UpdateProfile from "./pages/UpdateProfile.tsx";
import ShowProfileProvider from "./context/ShowProfileContext.tsx";
import UserProfileModalProvider from "./context/UserProfileContext.tsx";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/send",
        element: <SendMoney />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <UserProfileModalProvider>
      <ShowProfileProvider>
        <NotificationProvider>
          <ToastContextProvider>
            <RouterProvider router={router} />
          </ToastContextProvider>
        </NotificationProvider>
      </ShowProfileProvider>
    </UserProfileModalProvider>
  </Provider>,
);
