import { body } from "express-validator";

import { TAX_TYPES, DISCOUNT_TYPES } from "../../../shared/constants/index.js";

export const createServicePriceValidation = [
  body("serviceId")
    .notEmpty()

    .isMongoId()

    .withMessage("Service is required."),

  body("sellingPrice").isFloat({
    min: 0,
  }),

  body("costPrice")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("taxType")
    .optional()

    .isIn(Object.values(TAX_TYPES)),

  body("taxValue")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("discountType")
    .optional()

    .isIn(Object.values(DISCOUNT_TYPES)),

  body("discountValue")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("effectiveFrom")
    .optional()

    .isISO8601(),

  body("effectiveTo")
    .optional()

    .isISO8601(),

  body("isDefault")
    .optional()

    .isBoolean(),

  body("notes")
    .optional()

    .isLength({
      max: 500,
    }),
];

export const updateServicePriceValidation = [
  body("sellingPrice")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("costPrice")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("taxType")
    .optional()

    .isIn(Object.values(TAX_TYPES)),

  body("taxValue")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("discountType")
    .optional()

    .isIn(Object.values(DISCOUNT_TYPES)),

  body("discountValue")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("effectiveFrom")
    .optional()

    .isISO8601(),

  body("effectiveTo")
    .optional()

    .isISO8601(),

  body("isDefault")
    .optional()

    .isBoolean(),

  body("notes")
    .optional()

    .isLength({
      max: 500,
    }),
];
