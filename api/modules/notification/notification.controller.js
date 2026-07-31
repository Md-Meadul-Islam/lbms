import BaseController from "../../shared/base/BaseController.js";

import { asyncHandler } from "../../shared/helpers/index.js";

import NotificationService from "./notification.service.js";

class NotificationController extends BaseController {
  constructor() {
    super(NotificationService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const notification = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: notification,

      message: "Notification created successfully.",
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const notification = await this.service.findById(req.params.id);

    return this.success(res, {
      data: notification,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Recipient Notifications
    |--------------------------------------------------------------------------
    */

  getByRecipient = asyncHandler(async (req, res) => {
    const notifications = await this.service.getByRecipient(
      req.business._id,

      req.params.recipientId,

      req.query,
    );

    return this.success(res, {
      data: notifications,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Unread Notifications
    |--------------------------------------------------------------------------
    */

  getUnread = asyncHandler(async (req, res) => {
    const notifications = await this.service.getUnread(
      req.business._id,

      req.params.recipientId,

      req.query,
    );

    return this.success(res, {
      data: notifications,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Mark As Read
    |--------------------------------------------------------------------------
    */

  markAsRead = asyncHandler(async (req, res) => {
    const notification = await this.service.markAsRead(req.params.id);

    return this.success(res, {
      data: notification,

      message: "Notification marked as read.",
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Mark All As Read
    |--------------------------------------------------------------------------
    */

  markAllAsRead = asyncHandler(async (req, res) => {
    await this.service.markAllAsRead(
      req.business._id,

      req.params.recipientId,
    );

    return this.success(res, {
      message: "All notifications marked as read.",
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Count Unread
    |--------------------------------------------------------------------------
    */

  countUnread = asyncHandler(async (req, res) => {
    const count = await this.service.countUnread(
      req.business._id,

      req.params.recipientId,
    );

    return this.success(res, {
      data: {
        unread: count,
      },
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Archive
    |--------------------------------------------------------------------------
    */

  archive = asyncHandler(async (req, res) => {
    await this.service.archive(req.params.id);

    return this.success(res, {
      message: "Notification archived.",
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  delete = asyncHandler(async (req, res) => {
    await this.service.delete(req.params.id);

    return this.deleted(res);
  });
}

export default new NotificationController();
