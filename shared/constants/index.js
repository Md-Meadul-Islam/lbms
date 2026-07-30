import ROLES from "./roles.js";
import BUSINESS_TYPES from "./businessTypes.js";
import MODULES from "./modules.js";
import { STATUS, APPOINTMENT_STATUS, PAYMENT_STATUS } from "./status.js";

export {
  ROLES,
  BUSINESS_TYPES,
  MODULES,
  STATUS,
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
};

/**
 * import {
    ROLES,
    MODULES,
    BUSINESS_TYPES,
    STATUS,
} from "../shared/constants/index.js";

if (user.role !== ROLES.SUPER_ADMIN) {
    throw new Error("Unauthorized");
}
 */
