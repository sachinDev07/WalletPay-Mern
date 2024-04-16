import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "../hooks/userRefreshToken";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>{!persist ? <Outlet /> : <Outlet />}</>
  );
};

export default PersistLogin;
