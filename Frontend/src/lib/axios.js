// lib/axios.js
import axios from "axios";

console.log("🧪 Axios baseURL:", import.meta.env.VITE_API_URL);  // <== Add this

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
