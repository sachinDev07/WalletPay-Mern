import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import { RootState } from "./redux/store";

function App() {
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isLoggedIn) {
      navigate("/login");
    }
  }, [authState.isLoggedIn, navigate]);

  return authState.isLoggedIn ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : null;
}

export default App;
