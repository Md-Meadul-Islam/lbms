export const NOTIFICATION_TYPES = Object.freeze({
  APPOINTMENT_CREATED: "appointment_created",

  APPOINTMENT_UPDATED: "appointment_updated",

  APPOINTMENT_CANCELLED: "appointment_cancelled",

  APPOINTMENT_COMPLETED: "appointment_completed",

  PAYMENT_RECEIVED: "payment_received",

  CUSTOMER_CREATED: "customer_created",

  EMPLOYEE_CREATED: "employee_created",

  SERVICE_CREATED: "service_created",

  LOW_STOCK: "low_stock",

  SYSTEM: "system",
});
export const NOTIFICATION_CHANNELS = Object.freeze({
  IN_APP: "in_app",

  EMAIL: "email",

  SMS: "sms",

  PUSH: "push",

  WHATSAPP: "whatsapp",
});
export const NOTIFICATION_STATUS = Object.freeze({
  UNREAD: "unread",

  READ: "read",

  ARCHIVED: "archived",
});
/*
|--------------------------------------------------------------------------
| Recipient Types
|--------------------------------------------------------------------------
*/

export const NOTIFICATION_RECIPIENT_TYPES = Object.freeze({
  BUSINESS_OWNER: "business_owner",

  MANAGER: "manager",

  RECEPTIONIST: "receptionist",

  EMPLOYEE: "employee",

  CUSTOMER: "customer",
});

/*
|--------------------------------------------------------------------------
| Reference Types
|--------------------------------------------------------------------------
*/

export const NOTIFICATION_REFERENCE_TYPES = Object.freeze({
  APPOINTMENT: "appointment",

  APPOINTMENT_SERVICE: "appointment_service",

  APPOINTMENT_ADDON: "appointment_addon",

  CUSTOMER: "customer",

  EMPLOYEE: "employee",

  SERVICE: "service",

  SERVICE_ADDON: "service_addon",

  INVOICE: "invoice",

  PAYMENT: "payment",

  BUSINESS: "business",

  SYSTEM: "system",
});
