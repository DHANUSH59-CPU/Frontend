import axios from "axios";
import type { AxiosInstance } from "axios"; // 👈 Type-only import (safe with verbatimModuleSyntax)

// 🧩 Type-safe environment variable
const BASE_URL: string =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// Global defaults (optional)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL;

// ✅ Typed Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
