import axios from "axios";
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
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.post("http://localhost:7001/api/v1/users/logout",{},options);
      toast.success(response?.data?.message);
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
