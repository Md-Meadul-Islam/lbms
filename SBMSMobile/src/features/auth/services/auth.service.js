// src/features/auth/services/auth.service.js

import { apiClient } from "../../../api/client";
import { ENDPOINTS } from "../../../api/endpoints";

export const login = (credentials) =>
  apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
