/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5555";

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const persisted = localStorage.getItem("accessToken");
  if (!persisted) return null;

  try {
    const parsed = JSON.parse(persisted);
    return parsed?.state?.accessToken ?? null;
  } catch (e) {
    console.error("Failed to parse auth token from localStorage", e);
    return null;
  }
};

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isVerifying = false;

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;

      if (!isVerifying && !config.url?.includes("/verify-token")) {
        isVerifying = true;
        try {
          await axios.post(`${BASE_URL}/verify-token`, { token });
        } catch (error) {
          localStorage.removeItem("accessToken");
          toast.error("Token tidak valid. Harap login kembali.");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          throw error;
        } finally {
          isVerifying = false;
        }
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message || error.message;

    switch (status) {
      case 400:
        toast.error("Bad request");
        break;
      case 401:
        toast.error("Unauthorized. Please log in.");
        break;
      case 403:
        toast.error("Forbidden. You don’t have permission.");
        break;
      case 404:
        toast.error("Not Found");
        break;
      case 500:
        toast.error("Internal Server Error");
        break;
      default:
        toast.error(message || "Something went wrong");
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
