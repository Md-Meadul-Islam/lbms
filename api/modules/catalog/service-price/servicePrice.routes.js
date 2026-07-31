import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import ServicePriceController from "./servicePrice.controller.js";

import { createServicePriceValidation } from "./servicePrice.validation.js";

import { ROLES } from "../../../shared/constants/index.js";

const router = Router();

router.use(authenticate);

router.use(businessMiddleware);

router.post(
  "/",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  createServicePriceValidation,

  validate,

  ServicePriceController.create,
);

router.get(
  "/history/:serviceId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServicePriceController.getHistory,
);

export default router;
