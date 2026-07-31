export * from "./business.constants.js";
export * from "./catalog.constants.js";
export * from "./inventory.constants.js";
export * from "./sales.constants.js";
export * from "./status.js";

export { default as ROLES } from "./roles.js";
export { default as MODULES } from "./feature.modules.js";

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
