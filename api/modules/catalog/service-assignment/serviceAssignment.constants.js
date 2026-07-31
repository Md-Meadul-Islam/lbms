import { STATUS } from "../../../shared/constants/status.js";

export const SERVICE_ASSIGNMENT_MESSAGES = Object.freeze({
  CREATED: "Service assignment created successfully.",

  UPDATED: "Service assignment updated successfully.",

  FETCHED: "Service assignment fetched successfully.",

  DELETED: "Service assignment deleted successfully.",

  NOT_FOUND: "Service assignment not found.",

  EMPLOYEE_NOT_FOUND: "Employee not found.",

  SERVICE_NOT_FOUND: "Service not found.",

  SERVICE_PRICE_NOT_FOUND: "Service price not found.",

  DUPLICATE_ASSIGNMENT: "Employee is already assigned to this service.",

  INVALID_ADDON: "One or more service addons are invalid.",
});

export { STATUS };
