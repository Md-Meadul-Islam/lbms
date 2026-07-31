import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import { ROLES } from "../../../shared/constants/index.js";

import ServiceAssignmentController from "./serviceAssignment.controller.js";

import {
  createServiceAssignmentValidation,
  updateServiceAssignmentValidation,
} from "./serviceAssignment.validation.js";

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

  createServiceAssignmentValidation,

  validate,

  ServiceAssignmentController.create,
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

  ServiceAssignmentController.search,
);

/*
|--------------------------------------------------------------------------
| Employee
|--------------------------------------------------------------------------
*/

router.get(
  "/employee/:employeeId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAssignmentController.getByEmployee,
);

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/

router.get(
  "/service/:serviceId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAssignmentController.getByService,
);

/*
|--------------------------------------------------------------------------
| Primary
|--------------------------------------------------------------------------
*/

router.get(
  "/service/:serviceId/primary",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAssignmentController.getPrimary,
);

/*
|--------------------------------------------------------------------------
| Online Bookable
|--------------------------------------------------------------------------
*/

router.get(
  "/service/:serviceId/online",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  ServiceAssignmentController.getOnlineBookable,
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

  ServiceAssignmentController.getById,
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

  updateServiceAssignmentValidation,

  validate,

  ServiceAssignmentController.update,
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

  ServiceAssignmentController.delete,
);

export default router;
