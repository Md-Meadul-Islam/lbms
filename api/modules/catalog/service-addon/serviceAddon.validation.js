import { body } from "express-validator";

export const createServiceAddonValidation = [
  body("serviceId")
    .notEmpty()

    .isMongoId()

    .withMessage("Service is required."),

  body("name")
    .trim()

    .notEmpty()

    .withMessage("Addon name is required."),

  body("description")
    .optional()

    .isString(),

  body("image")
    .optional()

    .isString(),

  body("gallery")
    .optional()

    .isArray(),

  body("displayOrder")
    .optional()

    .isInt({
      min: 0,
    }),

  body("isFeatured")
    .optional()

    .isBoolean(),

  body("isRequired")
    .optional()

    .isBoolean(),

  body("allowMultiple")
    .optional()

    .isBoolean(),

  body("maxQuantity")
    .optional()

    .isInt({
      min: 1,
    }),
];

export const updateServiceAddonValidation = [
  body("name")
    .optional()

    .trim(),

  body("description")
    .optional()

    .isString(),

  body("image")
    .optional()

    .isString(),

  body("gallery")
    .optional()

    .isArray(),

  body("displayOrder")
    .optional()

    .isInt({
      min: 0,
    }),

  body("isFeatured")
    .optional()

    .isBoolean(),

  body("isRequired")
    .optional()

    .isBoolean(),

  body("allowMultiple")
    .optional()

    .isBoolean(),

  body("maxQuantity")
    .optional()

    .isInt({
      min: 1,
    }),
];
