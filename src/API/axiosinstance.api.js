import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthorized = error?.response?.status === 401;
    const isRefreshEndpoint = originalRequest?.url?.includes("/auth/refresh");
    const isLoginPage = window.location.pathname === "/auth/login";

    if (
      isAuthorized &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshEndpoint &&
      !isLoginPage
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/auth/refresh");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
