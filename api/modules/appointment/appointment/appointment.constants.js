import { STATUS } from "../../../shared/constants/status.js";

export const APPOINTMENT_STATUS = Object.freeze({
  PENDING: "pending",

  CONFIRMED: "confirmed",

  CHECKED_IN: "checked_in",

  IN_PROGRESS: "in_progress",

  COMPLETED: "completed",

  CANCELLED: "cancelled",

  NO_SHOW: "no_show",
});

export const APPOINTMENT_MESSAGES = Object.freeze({
  CREATED: "Appointment created successfully.",

  UPDATED: "Appointment updated successfully.",

  FETCHED: "Appointment fetched successfully.",

  DELETED: "Appointment deleted successfully.",

  NOT_FOUND: "Appointment not found.",

  CUSTOMER_NOT_FOUND: "Customer not found.",

  EMPLOYEE_NOT_FOUND: "Employee not found.",

  INVALID_DATE: "Invalid appointment date.",

  INVALID_TIME: "Invalid appointment time.",

  ALREADY_CANCELLED: "Appointment already cancelled.",

  ALREADY_COMPLETED: "Appointment already completed.",
});

export { STATUS };
