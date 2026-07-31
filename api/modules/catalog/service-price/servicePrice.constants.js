import { STATUS } from "../../../shared/constants/status.js";

export const SERVICE_PRICE_MESSAGES = Object.freeze({
  CREATED: "Service price created successfully.",

  UPDATED: "Service price updated successfully.",

  FETCHED: "Service price fetched successfully.",

  DELETED: "Service price deleted successfully.",

  NOT_FOUND: "Service price not found.",

  INVALID_SERVICE: "Service not found.",

  DEFAULT_PRICE_EXISTS: "Default price already exists.",

  OVERLAPPING_PRICE: "Price period overlaps with another price.",
});

export { STATUS };
