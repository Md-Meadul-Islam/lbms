import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import { ROLES } from "../../../shared/constants/index.js";

import ServiceController from "./service.controller.js";

import {
  createServiceValidation,
  updateServiceValidation,
} from "./service.validation.js";

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
| Create
|--------------------------------------------------------------------------
*/

router.post(
  "/",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  createServiceValidation,

  validate,

  ServiceController.create,
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

  ServiceController.getAll,
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

  ServiceController.search,
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

  ServiceController.getFeatured,
);

/*
|--------------------------------------------------------------------------
| Category
|--------------------------------------------------------------------------
*/

router.get(
  "/category/:categoryId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceController.getByCategory,
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

  ServiceController.getById,
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

  updateServiceValidation,

  validate,

  ServiceController.update,
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

  ServiceController.delete,
);

export default router;
