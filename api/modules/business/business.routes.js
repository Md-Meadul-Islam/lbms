import { Router } from "express";

import BusinessController from "./business.controller.js";

import authenticate from "../../middleware/auth.middleware.js";

import validate from "../../middleware/validation.middleware.js";

import {
  createBusinessValidation,
  updateBusinessValidation,
  updateModulesValidation,
} from "./business.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Business
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  createBusinessValidation,
  validate,
  BusinessController.create,
);

router.get("/me", authenticate, BusinessController.getMyBusiness);

router.get("/:id", authenticate, BusinessController.getById);

router.patch(
  "/:id",
  authenticate,
  updateBusinessValidation,
  validate,
  BusinessController.update,
);

/*
|--------------------------------------------------------------------------
| Modules
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/modules",
  authenticate,
  updateModulesValidation,
  validate,
  BusinessController.updateModules,
);

router.patch(
  "/:id/modules/:module/enable",
  authenticate,
  BusinessController.enableModule,
);

router.patch(
  "/:id/modules/:module/disable",
  authenticate,
  BusinessController.disableModule,
);

export default router;
