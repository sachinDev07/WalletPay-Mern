import axios from "../api/axios";
import { toast } from "react-toastify";

import useAuth from "./useAuth";


const useLogout = () => {
  const { setAuth } = useAuth();
  
  const logout = async () => {
    setAuth({
      id: "",
      role: "",
      firstname: "",
      lastname: "",
      accessToken: "",
      message: "",
    });
    try {
      const response = await axios.post("/users/logout",{});
      toast.success(response?.data?.message);
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
