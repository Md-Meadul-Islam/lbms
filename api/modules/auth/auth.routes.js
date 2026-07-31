import { Router } from "express";

const router = Router();

import AuthController from "./auth.controller.js";

import authenticate from "../../middleware/auth.middleware.js";

import validate from "../../middleware/validation.middleware.js";

import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
} from "./auth.validation.js";

router.post(
  "/register",

  registerValidation,

  validate,

  AuthController.register,
);

router.post(
  "/login",

  loginValidation,

  validate,

  AuthController.login,
);

router.get(
  "/profile",

  authenticate,

  AuthController.profile,
);

router.patch(
  "/change-password",

  authenticate,

  changePasswordValidation,

  validate,

  AuthController.changePassword,
);

export default router;
