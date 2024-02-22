import axios from "axios";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await axios
        .get("http://localhost:7001/api/v1/users/refreshToken", {
          withCredentials: true,
        })
        .catch((refreshTokenApiError) => {
          localStorage.removeItem("userProfile");
          return Promise.reject(refreshTokenApiError);
        });

      return axios(error.config);
    }
    return Promise.reject(error);
  },
);

export default jwtInterceptor;