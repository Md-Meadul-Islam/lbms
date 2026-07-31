import { body } from "express-validator";

import {
  SERVICE_DURATIONS,
  TAX_TYPES,
  DISCOUNT_TYPES,
} from "../../../shared/constants/index.js";

export const createServiceValidation = [
  body("categoryId")
    .notEmpty()
    .isMongoId()
    .withMessage("Category is required."),

  body("name").trim().notEmpty().withMessage("Service name is required."),

  body("description").optional().isString(),

  body("duration")
    .isInt()
    .custom((value) => {
      if (!SERVICE_DURATIONS.includes(Number(value))) {
        throw new Error("Invalid duration.");
      }

      return true;
    }),

  /*
    |--------------------------------------------------------------------------
    | Initial Price
    |--------------------------------------------------------------------------
    */

  body("sellingPrice").notEmpty().isFloat({
    min: 0,
  }),

  body("costPrice").optional().isFloat({
    min: 0,
  }),

  body("taxType").optional().isIn(Object.values(TAX_TYPES)),

  body("taxValue").optional().isFloat({
    min: 0,
  }),

  body("discountType").optional().isIn(Object.values(DISCOUNT_TYPES)),

  body("discountValue").optional().isFloat({
    min: 0,
  }),

  /*
    |--------------------------------------------------------------------------
    | Other
    |--------------------------------------------------------------------------
    */

  body("displayOrder").optional().isInt({
    min: 0,
  }),

  body("isFeatured").optional().isBoolean(),

  body("isOnlineBookable").optional().isBoolean(),

  body("requiresEmployee").optional().isBoolean(),
];

export const updateServiceValidation = [
  body("categoryId").optional().isMongoId(),

  body("name").optional().trim(),

  body("description").optional().isString(),

  body("duration")
    .optional()
    .custom((value) => {
      if (!SERVICE_DURATIONS.includes(Number(value))) {
        throw new Error("Invalid duration.");
      }

      return true;
    }),

  body("displayOrder").optional().isInt({
    min: 0,
  }),

  body("isFeatured").optional().isBoolean(),

  body("isOnlineBookable").optional().isBoolean(),

  body("requiresEmployee").optional().isBoolean(),
];
