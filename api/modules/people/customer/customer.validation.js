import { body } from "express-validator";

import {
  CUSTOMER_GENDERS,
  CUSTOMER_SOURCES,
  MEMBERSHIP_LEVELS,
} from "./customer.constants.js";

export const createCustomerValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),

  body("phone").trim().notEmpty().withMessage("Phone number is required."),

  body("email")
    .optional({
      checkFalsy: true,
    })
    .isEmail()
    .withMessage("Invalid email."),

  body("gender").optional().isIn(Object.values(CUSTOMER_GENDERS)),

  body("source").optional().isIn(Object.values(CUSTOMER_SOURCES)),

  body("membership.level").optional().isIn(Object.values(MEMBERSHIP_LEVELS)),
];

export const updateCustomerValidation = [
  body("firstName").optional(),

  body("lastName").optional(),

  body("phone").optional(),

  body("email")
    .optional({
      checkFalsy: true,
    })
    .isEmail(),

  body("gender").optional().isIn(Object.values(CUSTOMER_GENDERS)),

  body("source").optional().isIn(Object.values(CUSTOMER_SOURCES)),

  body("membership.level").optional().isIn(Object.values(MEMBERSHIP_LEVELS)),
];

export const updateCustomerStatusValidation = [
  body("status").notEmpty().withMessage("Status is required."),
];

export const updateLoyaltyValidation = [
  body("points").isInt().withMessage("Points must be an integer."),

  body("type")
    .isIn(["add", "subtract"])
    .withMessage("Type must be add or subtract."),
];
