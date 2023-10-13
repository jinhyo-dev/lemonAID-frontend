import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get(import.meta.env.VITE_COOKIE_NAME);
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default axiosInstance;