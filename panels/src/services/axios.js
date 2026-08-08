import { BACKEND_URL } from "../config/api";
import axios from "axios";

const instance = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;