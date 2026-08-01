import { createContext, useContext, useEffect, useState } from "react";

import StorageService from "../services/storage/storage.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const accessToken = await StorageService.getAccessToken();

      const userData = await StorageService.getUser();

      if (accessToken && userData) {
        setToken(accessToken);

        setUser(userData);
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(data) {
    setToken(data.accessToken);

    setUser(data.user);

    await StorageService.setAccessToken(data.accessToken);

    await StorageService.setUser(data.user);
  }

  async function logout() {
    await StorageService.clearSession();

    setToken(null);

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,

        token,

        loading,

        isAuthenticated: !!token,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
