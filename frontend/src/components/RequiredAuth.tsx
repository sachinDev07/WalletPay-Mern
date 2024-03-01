import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = ({ allowedRole }:{allowedRole: string}) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log("firstname: ", auth.firstname);

  return (
    auth?.role === allowedRole 
        ? <Outlet />
        : auth?.firstname 
            ? <Navigate to="/signup" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
