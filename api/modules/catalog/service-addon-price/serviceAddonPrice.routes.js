import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import { ROLES } from "../../../shared/constants/index.js";

import ServiceAddonPriceController from "./serviceAddonPrice.controller.js";

import {
  createServiceAddonPriceValidation,
  updateServiceAddonPriceValidation,
} from "./serviceAddonPrice.validation.js";

const router = Router();

router.use(authenticate);

router.use(businessMiddleware);

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

router.post(
  "/",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  createServiceAddonPriceValidation,

  validate,

  ServiceAddonPriceController.create,
);

/*
|--------------------------------------------------------------------------
| Current Price
|--------------------------------------------------------------------------
*/

router.get(
  "/current/:addonId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonPriceController.getCurrentPrice,
);

/*
|--------------------------------------------------------------------------
| Price History
|--------------------------------------------------------------------------
*/

router.get(
  "/history/:addonId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonPriceController.getHistory,
);

/*
|--------------------------------------------------------------------------
| Future Prices
|--------------------------------------------------------------------------
*/

router.get(
  "/future/:addonId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  ServiceAddonPriceController.getFuturePrices,
);

/*
|--------------------------------------------------------------------------
| Expired Prices
|--------------------------------------------------------------------------
*/

router.get(
  "/expired/:addonId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  ServiceAddonPriceController.getExpiredPrices,
);

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonPriceController.getById,
);

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  updateServiceAddonPriceValidation,

  validate,

  ServiceAddonPriceController.update,
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  ServiceAddonPriceController.delete,
);

export default router;
