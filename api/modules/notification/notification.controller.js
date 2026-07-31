import BaseController from "../../shared/base/BaseController.js";

import { asyncHandler } from "../../shared/helpers/index.js";

import NotificationService from "./notification.service.js";

import { NOTIFICATION_MESSAGES } from "./notification.constants.js";

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

      message: NOTIFICATION_MESSAGES.CREATED,
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
      message: NOTIFICATION_MESSAGES.FETCHED,
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
      message: NOTIFICATION_MESSAGES.FETCHED_ALL,
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
      message: NOTIFICATION_MESSAGES.FETCHED_ALL,
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
      message: NOTIFICATION_MESSAGES.MARKED_AS_READ,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Mark All As Read
    |--------------------------------------------------------------------------
    */

  markAllAsRead = asyncHandler(async (req, res) => {
    await this.service.markAllAsRead(req.business._id, req.params.recipientId);

    return this.success(res, {
      message: NOTIFICATION_MESSAGES.MARKED_ALL_AS_READ,
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
      message: NOTIFICATION_MESSAGES.ARCHIVED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  delete = asyncHandler(async (req, res) => {
    await this.service.delete(req.params.id);

    return this.deleted(res, { message: NOTIFICATION_MESSAGES.DELETED });
  });
}

export default new NotificationController();
