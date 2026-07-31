export const APPOINTMENT_SERVICE_STATUS = Object.freeze({
  PENDING: "pending",

  IN_PROGRESS: "in_progress",

  COMPLETED: "completed",

  CANCELLED: "cancelled",
});

export const APPOINTMENT_SERVICE_MESSAGES = Object.freeze({
  CREATED: "Appointment service created successfully.",

  UPDATED: "Appointment service updated successfully.",

  FETCHED: "Appointment service fetched successfully.",

  DELETED: "Appointment service deleted successfully.",

  NOT_FOUND: "Appointment service not found.",

  APPOINTMENT_NOT_FOUND: "Appointment not found.",

  SERVICE_NOT_FOUND: "Service not found.",

  EMPLOYEE_NOT_FOUND: "Employee not found.",

  ASSIGNMENT_NOT_FOUND: "Service assignment not found.",

  INVALID_PRICE: "Invalid service price.",
});
