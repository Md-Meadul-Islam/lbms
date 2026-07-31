import { ROLES, STATUS } from "../../../shared/constants/index.js";

export const EMPLOYMENT_TYPES = Object.freeze({
  FULL_TIME: "full_time",
  PART_TIME: "part_time",
  CONTRACT: "contract",
  INTERN: "intern",
  FREELANCER: "freelancer",
});

export const GENDERS = Object.freeze({
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
});

export const EMPLOYEE_MESSAGES = Object.freeze({
  CREATED: "Employee created successfully.",
  UPDATED: "Employee updated successfully.",
  FETCHED: "Employee fetched successfully.",
  DELETED: "Employee deleted successfully.",

  NOT_FOUND: "Employee not found.",

  EMAIL_EXISTS: "Email already exists.",

  CODE_EXISTS: "Employee code already exists.",

  PASSWORD_CHANGED: "Password changed successfully.",

  PASSWORD_RESET: "Password reset successfully.",
});

export const DEFAULT_PERMISSIONS = {
  [ROLES.BUSINESS_OWNER]: ["*"],

  [ROLES.MANAGER]: [
    "dashboard",
    "employees",
    "customers",
    "appointments",
    "services",
    "reports",
  ],

  [ROLES.RECEPTIONIST]: ["dashboard", "appointments", "customers"],

  [ROLES.CASHIER]: ["dashboard", "sales"],

  [ROLES.STAFF]: ["dashboard", "appointments"],
};

export { STATUS };
