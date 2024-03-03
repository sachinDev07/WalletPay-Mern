import axios from "axios";

import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get("/refresh-token", options);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { 
        ...prev, 
        role: response.data.role,
        accessToken: response.data.accessToken 
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
