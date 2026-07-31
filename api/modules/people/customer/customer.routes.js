import { Router } from "express";

import CustomerController from "./customer.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";

import businessMiddleware from "../../../middleware/business.middleware.js";

import authorize from "../../../middleware/authorize.middleware.js";

import validate from "../../../middleware/validation.middleware.js";

import {
  createCustomerValidation,
  updateCustomerValidation,
  updateLoyaltyValidation,
} from "./customer.validation.js";

import { ROLES } from "../../../shared/constants/index.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

router.use(authenticate);

router.use(businessMiddleware);

/*
|--------------------------------------------------------------------------
| Customer Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER, ROLES.RECEPTIONIST),
  createCustomerValidation,
  validate,
  CustomerController.create,
);

router.get(
  "/",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER, ROLES.RECEPTIONIST),
  CustomerController.getAll,
);

router.get(
  "/search",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER, ROLES.RECEPTIONIST),
  CustomerController.search,
);

router.get(
  "/:id",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER, ROLES.RECEPTIONIST),
  CustomerController.getById,
);

router.patch(
  "/:id",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER, ROLES.RECEPTIONIST),
  updateCustomerValidation,
  validate,
  CustomerController.update,
);

router.delete(
  "/:id",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER),
  CustomerController.delete,
);

router.patch(
  "/:id/loyalty",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER),
  updateLoyaltyValidation,
  validate,
  CustomerController.updateLoyalty,
);

router.patch(
  "/:id/visit",
  authorize(ROLES.BUSINESS_OWNER, ROLES.MANAGER, ROLES.RECEPTIONIST),
  CustomerController.updateLastVisit,
);

export default router;
