import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import { ROLES } from "../../../shared/constants/index.js";

import AppointmentAddonController from "./appointmentAddon.controller.js";

import {
  createAppointmentAddonValidation,
  updateAppointmentAddonValidation,
} from "./appointmentAddon.validation.js";

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

  createAppointmentAddonValidation,

  validate,

  AppointmentAddonController.create,
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

  AppointmentAddonController.getByAppointment,
);

/*
|--------------------------------------------------------------------------
| Appointment Service
|--------------------------------------------------------------------------
*/

router.get(
  "/appointment-service/:appointmentServiceId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentAddonController.getByAppointmentService,
);

/*
|--------------------------------------------------------------------------
| Service Addon
|--------------------------------------------------------------------------
*/

router.get(
  "/service-addon/:serviceAddonId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentAddonController.getByServiceAddon,
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

  AppointmentAddonController.getById,
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

  updateAppointmentAddonValidation,

  validate,

  AppointmentAddonController.update,
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

  AppointmentAddonController.delete,
);

export default router;
