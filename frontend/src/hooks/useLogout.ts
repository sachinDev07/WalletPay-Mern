import axios from "../api/axios";

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
      await axios.post("/users/logout",{});
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
