import { Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import PersistLogin from "./components/PersistentLogin";
import RequiredAuth from "./components/RequiredAuth";
import Layout from "./components/Layout";
import UserProfileModalProvider from "./context/UserProfileContext";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserProfileModalProvider><Layout /></UserProfileModalProvider>}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth allowedRole="user" />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          <Route element={<RequiredAuth allowedRole="user" />}>
            <Route path="/send" element={<SendMoney />} />
          </Route>

          <Route element={<RequiredAuth allowedRole="user" />}>
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
