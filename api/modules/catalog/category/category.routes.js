import { Router } from "express";

import CategoryController from "./category.controller.js";

import authenticate from "../../../middleware/auth.middleware.js";

import businessMiddleware from "../../../middleware/business.middleware.js";

import authorize from "../../../middleware/authorize.middleware.js";

import validate from "../../../middleware/validation.middleware.js";

import {
  createCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";

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
| Category Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  createCategoryValidation,

  validate,

  CategoryController.create,
);

router.get(
  "/",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  CategoryController.getAll,
);

router.get(
  "/tree",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  CategoryController.getTree,
);

router.get(
  "/search",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  CategoryController.search,
);

router.get(
  "/featured",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  CategoryController.featured,
);

router.get(
  "/:id",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  CategoryController.getById,
);

router.patch(
  "/:id",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  updateCategoryValidation,

  validate,

  CategoryController.update,
);

router.delete(
  "/:id",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,
  ),

  CategoryController.delete,
);

export default router;
