import { body } from "express-validator";

import { COMMISSION_TYPES } from "../../../shared/constants/index.js";

export const createServiceAssignmentValidation = [
  body("employeeId")
    .notEmpty()

    .isMongoId()

    .withMessage("Employee is required."),

  body("serviceId")
    .notEmpty()

    .isMongoId()

    .withMessage("Service is required."),

  body("servicePriceId")
    .notEmpty()

    .isMongoId()

    .withMessage("Service price is required."),

  body("allowedAddonIds")
    .optional()

    .isArray(),

  body("allowedAddonIds.*")
    .optional()

    .isMongoId(),

  body("estimatedDuration")
    .optional()

    .isInt({
      min: 1,
    }),

  body("commissionType")
    .optional()

    .isIn(Object.values(COMMISSION_TYPES)),

  body("commissionValue")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("priority")
    .optional()

    .isInt({
      min: 1,
    }),

  body("isPrimary")
    .optional()

    .isBoolean(),

  body("isOnlineBookable")
    .optional()

    .isBoolean(),
];

export const updateServiceAssignmentValidation = [
  body("servicePriceId")
    .optional()

    .isMongoId(),

  body("allowedAddonIds")
    .optional()

    .isArray(),

  body("allowedAddonIds.*")
    .optional()

    .isMongoId(),

  body("estimatedDuration")
    .optional()

    .isInt({
      min: 1,
    }),

  body("commissionType")
    .optional()

    .isIn(Object.values(COMMISSION_TYPES)),

  body("commissionValue")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("priority")
    .optional()

    .isInt({
      min: 1,
    }),

  body("isPrimary")
    .optional()

    .isBoolean(),

  body("isOnlineBookable")
    .optional()

    .isBoolean(),
];
