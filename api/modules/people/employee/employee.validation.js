import { body } from "express-validator";

import { ROLES } from "../../../shared/constants/index.js";

import { EMPLOYMENT_TYPES, GENDERS } from "./employee.constants.js";

export const createEmployeeValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),

  body("email").trim().isEmail().withMessage("Valid email is required."),

  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters."),

  body("role").optional().isIn(Object.values(ROLES)),

  body("gender").optional().isIn(Object.values(GENDERS)),

  body("employmentType").optional().isIn(Object.values(EMPLOYMENT_TYPES)),

  body("salary").optional().isNumeric(),

  body("commission").optional().isNumeric(),
];

export const updateEmployeeValidation = [
  body("firstName").optional(),

  body("lastName").optional(),

  body("email").optional().isEmail(),

  body("phone").optional(),

  body("designation").optional(),

  body("department").optional(),

  body("salary").optional().isNumeric(),

  body("commission").optional().isNumeric(),
];

export const changePasswordValidation = [
  body("currentPassword").notEmpty(),

  body("newPassword").isLength({
    min: 6,
  }),
];

export const resetPasswordValidation = [
  body("password").isLength({
    min: 6,
  }),
];
