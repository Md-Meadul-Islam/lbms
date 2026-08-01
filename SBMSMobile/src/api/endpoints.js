// src/api/endpoints.js

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  BUSINESS: {
    LIST: "/business",
    SELECT: "/business/select",
  },

  SERVICES: {
    LIST: "/services",
    CREATE: "/services",
    UPDATE: (id) => `/services/${id}`,
    DELETE: (id) => `/services/${id}`,
  },

  APPOINTMENTS: {
    LIST: "/appointments",
    CREATE: "/appointments",
    DETAILS: (id) => `/appointments/${id}`,
  },
};
