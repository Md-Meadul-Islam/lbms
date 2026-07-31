import { body } from "express-validator";

import { APPOINTMENT_STATUS } from "./appointment.constants.js";

export const createAppointmentValidation = [
  body("customerId")
    .notEmpty()

    .isMongoId()

    .withMessage("Customer is required."),

  body("appointmentDate")
    .notEmpty()

    .isISO8601()

    .withMessage("Appointment date is required."),

  body("startTime")
    .notEmpty()

    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)

    .withMessage("Start time must be HH:mm."),

  body("notes")
    .optional()

    .isLength({
      max: 1000,
    }),
];

export const updateAppointmentValidation = [
  body("appointmentDate")
    .optional()

    .isISO8601(),

  body("startTime")
    .optional()

    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),

  body("endTime")
    .optional()

    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/),

  body("status")
    .optional()

    .isIn(Object.values(APPOINTMENT_STATUS)),

  body("discount")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("tax")
    .optional()

    .isFloat({
      min: 0,
    }),

  body("notes")
    .optional()

    .isLength({
      max: 1000,
    }),
];
