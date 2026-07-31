import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import { ROLES } from "../../../shared/constants/index.js";

import ServiceAddonController from "./serviceAddon.controller.js";

import {
  createServiceAddonValidation,
  updateServiceAddonValidation,
} from "./serviceAddon.validation.js";

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

  createServiceAddonValidation,

  validate,

  ServiceAddonController.create,
);

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

router.get(
  "/",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonController.getAll,
);

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

router.get(
  "/search",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonController.search,
);

/*
|--------------------------------------------------------------------------
| Featured
|--------------------------------------------------------------------------
*/

router.get(
  "/featured",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonController.getFeatured,
);

/*
|--------------------------------------------------------------------------
| Service Addons
|--------------------------------------------------------------------------
*/

router.get(
  "/service/:serviceId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonController.getByService,
);

/*
|--------------------------------------------------------------------------
| Required Addons
|--------------------------------------------------------------------------
*/

router.get(
  "/service/:serviceId/required",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAddonController.getRequired,
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

  ServiceAddonController.getById,
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

  updateServiceAddonValidation,

  validate,

  ServiceAddonController.update,
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

  ServiceAddonController.delete,
);

export default router;
