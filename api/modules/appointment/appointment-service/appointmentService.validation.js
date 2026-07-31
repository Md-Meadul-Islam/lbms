import { body } from "express-validator";

import { APPOINTMENT_SERVICE_STATUS } from "./appointmentService.constants.js";

export const createAppointmentServiceValidation = [
  body("appointmentId")
    .notEmpty()

    .isMongoId(),

  body("serviceId")
    .notEmpty()

    .isMongoId(),

  body("employeeId")
    .notEmpty()

    .isMongoId(),

  body("quantity")
    .optional()

    .isInt({
      min: 1,
    }),

  body("notes")
    .optional()

    .isLength({
      max: 500,
    }),
];

export const updateAppointmentServiceValidation = [
  body("employeeId")
    .optional()

    .isMongoId(),

  body("quantity")
    .optional()

    .isInt({
      min: 1,
    }),

  body("status")
    .optional()

    .isIn(Object.values(APPOINTMENT_SERVICE_STATUS)),

  body("notes")
    .optional()

    .isLength({
      max: 500,
    }),
];
