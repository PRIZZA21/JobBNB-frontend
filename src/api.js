import axios from "axios";

const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Skip token for auth APIs
    if (config.url?.startsWith("/auth")) {
      return config;
    }

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 || error.response?.status === 403) {
      originalRequest._retry = true;
      localStorage.removeItem("accessToken");

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await api.post("/auth/refresh", { refreshToken });
        localStorage.setItem("accessToken", response.data.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
        return api(originalRequest);
      } catch (error) {
        logoutUser();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
