import axios from "axios";

export const BASE_URL = "http://localhost:7001/api/v1";


const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;