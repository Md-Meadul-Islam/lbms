import { body } from "express-validator";

export const registerValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),

  body("lastName").optional().trim(),

  body("email").trim().isEmail().withMessage("Valid email is required."),

  body("phone").optional().trim(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters."),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Email is required."),

  body("password").notEmpty().withMessage("Password is required."),
];

export const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must contain at least 6 characters."),
];
