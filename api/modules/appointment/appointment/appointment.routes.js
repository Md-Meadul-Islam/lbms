import { Router } from "express";

import authenticate from "../../../middleware/auth.middleware.js";
import authorize from "../../../middleware/authorize.middleware.js";
import businessMiddleware from "../../../middleware/business.middleware.js";
import validate from "../../../middleware/validation.middleware.js";

import { ROLES } from "../../../shared/constants/index.js";

import AppointmentController from "./appointment.controller.js";

import {
  createAppointmentValidation,
  updateAppointmentValidation,
} from "./appointment.validation.js";

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

  createAppointmentValidation,

  validate,

  AppointmentController.create,
);

/*
|--------------------------------------------------------------------------
| Today
|--------------------------------------------------------------------------
*/

router.get(
  "/today",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentController.getTodayAppointments,
);

/*
|--------------------------------------------------------------------------
| Upcoming
|--------------------------------------------------------------------------
*/

router.get(
  "/upcoming",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentController.getUpcomingAppointments,
);

/*
|--------------------------------------------------------------------------
| Customer
|--------------------------------------------------------------------------
*/

router.get(
  "/customer/:customerId",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentController.getByCustomer,
);

/*
|--------------------------------------------------------------------------
| Date
|--------------------------------------------------------------------------
*/

router.get(
  "/date/:date",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentController.getByDate,
);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

router.get(
  "/status/:status",

  authorize(
    ROLES.BUSINESS_OWNER,

    ROLES.MANAGER,

    ROLES.RECEPTIONIST,
  ),

  AppointmentController.getByStatus,
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

  AppointmentController.getById,
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

  updateAppointmentValidation,

  validate,

  AppointmentController.update,
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

  AppointmentController.delete,
);

export default router;
