import axios from "axios";
import { ENV } from "../config/env";
import { setupInterceptors } from "./interceptors";

export const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

setupInterceptors(apiClient);
