export const STATUS = Object.freeze({
  ACTIVE: "active",

  INACTIVE: "inactive",

  ARCHIVED: "archived",

  DELETED: "deleted",
});

export const APPOINTMENT_STATUS = Object.freeze({
  REQUESTED: "requested",

  CONFIRMED: "confirmed",

  CHECKED_IN: "checked_in",

  IN_PROGRESS: "in_progress",

  COMPLETED: "completed",

  CANCELLED: "cancelled",

  NO_SHOW: "no_show",
});

export const PAYMENT_STATUS = Object.freeze({
  UNPAID: "unpaid",

  PARTIAL: "partial",

  PAID: "paid",

  REFUNDED: "refunded",
});
