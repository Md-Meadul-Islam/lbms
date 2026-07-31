import { Router } from "express";

import EmployeeController from "./employee.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";

import businessMiddleware from "../../../middleware/business.middleware.js";

import authorize from "../../../middleware/authorize.middleware.js";

import validate from "../../../middleware/validation.middleware.js";

import {
  createEmployeeValidation,
  updateEmployeeValidation,
  resetPasswordValidation,
} from "./employee.validation.js";

import { ROLES } from "../../../shared/constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Apply Middleware
|--------------------------------------------------------------------------
*/

router.use(authenticate);

router.use(businessMiddleware);

/*
|--------------------------------------------------------------------------
| Employee
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER),
  createEmployeeValidation,
  validate,
  EmployeeController.create,
);

router.get(
  "/",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER),
  EmployeeController.getAll,
);

router.get("/me", EmployeeController.me);

router.get(
  "/:id",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER),
  EmployeeController.getById,
);

router.patch(
  "/:id",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER),
  updateEmployeeValidation,
  validate,
  EmployeeController.update,
);

router.delete(
  "/:id",
  authorize(ROLES.BUSINESS_OWNER),
  EmployeeController.delete,
);

router.patch(
  "/:id/status",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER),
  EmployeeController.changeStatus,
);

router.patch(
  "/:id/password",
  authorize(ROLES.BUSINESS_OWNER),
  resetPasswordValidation,
  validate,
  EmployeeController.resetPassword,
);

export default router;
