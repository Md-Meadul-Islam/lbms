import { STATUS } from "../../../shared/constants/status.js";

export const SERVICE_ADDON_PRICE_MESSAGES = Object.freeze({
  CREATED: "Service addon price created successfully.",

  UPDATED: "Service addon price updated successfully.",

  FETCHED: "Service addon price fetched successfully.",

  DELETED: "Service addon price deleted successfully.",

  NOT_FOUND: "Service addon price not found.",

  INVALID_ADDON: "Service addon not found.",

  DEFAULT_PRICE_EXISTS: "Default addon price already exists.",

  OVERLAPPING_PRICE: "Addon price period overlaps with another price.",
});

export { STATUS };
