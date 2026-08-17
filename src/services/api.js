import axios from "axios";

const api = axios.create({
  baseURL: "https://fedricdjango.onrender.com/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (
    token &&
    config.url !== "login/" &&
    config.url !== "register/"
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

