import { Router } from "express";

import authenticate from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/authorize.middleware.js";
import businessMiddleware from "../../middleware/business.middleware.js";

import NotificationController from "./notification.controller.js";

import validate from "../../middleware/validation.middleware.js";

import { createNotificationValidation } from "./notification.validation.js";

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

  createNotificationValidation,

  validate,

  NotificationController.create,
);

/*
|--------------------------------------------------------------------------
| Recipient
|--------------------------------------------------------------------------
*/

router.get(
  "/recipient/:recipientId",

  NotificationController.getByRecipient,
);

/*
|--------------------------------------------------------------------------
| Unread
|--------------------------------------------------------------------------
*/

router.get(
  "/recipient/:recipientId/unread",

  NotificationController.getUnread,
);

/*
|--------------------------------------------------------------------------
| Count
|--------------------------------------------------------------------------
*/

router.get(
  "/recipient/:recipientId/count",

  NotificationController.countUnread,
);

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",

  NotificationController.getById,
);

/*
|--------------------------------------------------------------------------
| Mark Read
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/read",

  NotificationController.markAsRead,
);

/*
|--------------------------------------------------------------------------
| Mark All Read
|--------------------------------------------------------------------------
*/

router.patch(
  "/recipient/:recipientId/read",

  NotificationController.markAllAsRead,
);

/*
|--------------------------------------------------------------------------
| Archive
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/archive",

  NotificationController.archive,
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",

  NotificationController.delete,
);

export default router;
