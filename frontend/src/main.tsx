import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import SignUp from "./components/SignUp.tsx";
import SignIn from "./components/SignIn.tsx";
import Dashboard from "./components/Dashboard.tsx";
import SendMoney from "./components/SendMoney.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/send",
        element: <SendMoney />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={router} />);
