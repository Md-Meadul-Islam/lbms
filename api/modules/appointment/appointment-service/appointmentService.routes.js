import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import { ROLES } from "../../../shared/constants/index.js";

import AppointmentServiceController from "./appointmentService.controller.js";

import {
  createAppointmentServiceValidation,
  updateAppointmentServiceValidation,
} from "./appointmentService.validation.js";

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

    ROLES.RECEPTIONIST,
  ),

  createAppointmentServiceValidation,

  validate,

  AppointmentServiceController.create,
);

/*
|--------------------------------------------------------------------------
| Appointment
|--------------------------------------------------------------------------
*/

router.get(
  "/appointment/:appointmentId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentServiceController.getByAppointment,
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

  AppointmentServiceController.getByEmployee,
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

  AppointmentServiceController.getByService,
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

  AppointmentServiceController.getById,
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

    ROLES.RECEPTIONIST,
  ),

  updateAppointmentServiceValidation,

  validate,

  AppointmentServiceController.update,
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

  AppointmentServiceController.delete,
);

export default router;
