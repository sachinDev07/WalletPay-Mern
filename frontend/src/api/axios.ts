import axios from "axios";

export const BASE_URL = "https://walletpay-qq4j.onrender.com/api/v1";


export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


