import StorageService from "../services/storage/storage.service";

export const setupInterceptors = (apiClient) => {
  apiClient.interceptors.request.use(
    async (config) => {
      const token = await StorageService.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // TODO:
        // Refresh token or logout.
      }

      return Promise.reject(error);
    },
  );
};
