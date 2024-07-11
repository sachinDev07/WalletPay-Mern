import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;