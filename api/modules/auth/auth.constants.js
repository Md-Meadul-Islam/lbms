import { ROLES } from "../../shared/constants/index.js";

export const AUTH_MESSAGES = Object.freeze({
  REGISTER_SUCCESS: "User registered successfully.",
  LOGIN_SUCCESS: "Login successful.",
  PROFILE_FETCHED: "Profile fetched successfully.",
  PASSWORD_CHANGED: "Password changed successfully.",

  INVALID_CREDENTIALS: "Invalid email or password.",
  USER_ALREADY_EXISTS: "User already exists.",
  USER_NOT_FOUND: "User not found.",
  ACCOUNT_INACTIVE: "Your account is inactive.",
  PASSWORD_INCORRECT: "Current password is incorrect.",
});
