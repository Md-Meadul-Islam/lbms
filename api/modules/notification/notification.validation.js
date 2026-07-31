import { body } from "express-validator";

export const createNotificationValidation = [
  body("recipientType").notEmpty().withMessage("Recipient type is required."),

  body("recipientId")
    .notEmpty()
    .isMongoId()
    .withMessage("Recipient id is invalid."),

  body("title").trim().notEmpty().isLength({
    max: 150,
  }),

  body("message").trim().notEmpty().isLength({
    max: 1000,
  }),

  body("type").notEmpty(),

  body("channel").optional(),

  body("referenceType").optional(),

  body("referenceId").optional().isMongoId(),

  body("data").optional().isObject(),
];

export const updateNotificationValidation = [
  body("notificationStatus").optional(),

  body("readAt").optional().isISO8601(),
];
