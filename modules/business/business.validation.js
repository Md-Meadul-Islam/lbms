import { body } from "express-validator";

import { BUSINESS_TYPES } from "../../shared/constants/index.js";

export const createBusinessValidation = [
  body("name").trim().notEmpty().withMessage("Business name is required."),

  body("businessType")
    .isIn(Object.values(BUSINESS_TYPES))
    .withMessage("Invalid business type."),

  body("email").optional().isEmail(),

  body("phone").optional(),

  body("website").optional(),

  body("address").optional(),

  body("city").optional(),

  body("country").optional(),
];

export const updateBusinessValidation = [
  body("name").optional(),

  body("email").optional().isEmail(),

  body("phone").optional(),

  body("website").optional(),

  body("address").optional(),

  body("city").optional(),

  body("country").optional(),
];

export const updateModulesValidation = [
  body("enabledModules")
    .isArray()
    .withMessage("enabledModules must be an array."),
];
