import axios from "axios";
import { auth } from "../Firebase";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL_API,
});

// Attach Firebase ID token to every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(); // always fresh
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
