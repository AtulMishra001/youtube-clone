import axios from "axios";

const api = axios.create({
    //Base URL for backend calls
  baseURL: "http://localhost:3000/api",
});

// AUTOMATIC AUTHENTICATION
// This "interceptor" runs before every request.
// It checks if you have a token and attaches it.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
