import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4005/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: Add interceptors for token handling, logging, etc.
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // You can add more advanced error handling here
    return Promise.reject(error);
  }
);
