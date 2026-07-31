import { STATUS } from "../../../shared/constants/index.js";

export const CUSTOMER_GENDERS = Object.freeze({
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
});

export const CUSTOMER_SOURCES = Object.freeze({
  WALK_IN: "walk_in",
  REFERRAL: "referral",
  ONLINE: "online",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  WEBSITE: "website",
  WHATSAPP: "whatsapp",
  OTHER: "other",
});

export const MEMBERSHIP_LEVELS = Object.freeze({
  REGULAR: "regular",
  SILVER: "silver",
  GOLD: "gold",
  PLATINUM: "platinum",
  VIP: "vip",
});

export const CUSTOMER_MESSAGES = Object.freeze({
  CREATED: "Customer created successfully.",

  UPDATED: "Customer updated successfully.",

  FETCHED: "Customer fetched successfully.",

  DELETED: "Customer deleted successfully.",

  NOT_FOUND: "Customer not found.",

  EMAIL_EXISTS: "Customer email already exists.",

  PHONE_EXISTS: "Customer phone already exists.",

  CODE_EXISTS: "Customer code already exists.",
});

export { STATUS };
