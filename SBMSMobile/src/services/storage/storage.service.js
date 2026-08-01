import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../constants/storageKeys";

class StorageService {
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage setItem error:", error);
    }
  }

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);

      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Storage getItem error:", error);
      return null;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Storage removeItem error:", error);
    }
  }

  async clear() {
    await AsyncStorage.clear();
  }

  //------------------------
  // Access Token
  //------------------------

  setAccessToken(token) {
    return this.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getAccessToken() {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  removeAccessToken() {
    return this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  //------------------------
  // Refresh Token
  //------------------------

  setRefreshToken(token) {
    return this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  getRefreshToken() {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  removeRefreshToken() {
    return this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  //------------------------
  // User
  //------------------------

  setUser(user) {
    return this.setItem(STORAGE_KEYS.USER, user);
  }

  getUser() {
    return this.getItem(STORAGE_KEYS.USER);
  }

  removeUser() {
    return this.removeItem(STORAGE_KEYS.USER);
  }

  //------------------------
  // Business
  //------------------------

  setBusiness(business) {
    return this.setItem(STORAGE_KEYS.BUSINESS, business);
  }

  getBusiness() {
    return this.getItem(STORAGE_KEYS.BUSINESS);
  }

  removeBusiness() {
    return this.removeItem(STORAGE_KEYS.BUSINESS);
  }

  //------------------------
  // Logout
  //------------------------

  async clearSession() {
    await Promise.all([
      this.removeAccessToken(),
      this.removeRefreshToken(),
      this.removeUser(),
      this.removeBusiness(),
    ]);
  }
}

export default new StorageService();
