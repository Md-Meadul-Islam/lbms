import { body } from "express-validator";

export const createAppointmentAddonValidation = [
  body("appointmentId").notEmpty().isMongoId(),

  body("appointmentServiceId").notEmpty().isMongoId(),

  body("serviceAddonId").notEmpty().isMongoId(),

  body("quantity").optional().isInt({
    min: 1,
  }),

  body("notes").optional().isLength({
    max: 500,
  }),
];

export const updateAppointmentAddonValidation = [
  body("quantity").optional().isInt({
    min: 1,
  }),

  body("notes").optional().isLength({
    max: 500,
  }),
];
