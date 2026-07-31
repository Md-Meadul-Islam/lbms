import BaseRepository from "../../shared/base/BaseRepository.js";

import Notification from "./notification.model.js";

import { NOTIFICATION_STATUS } from "../../shared/constants/index.js";

class NotificationRepository extends BaseRepository {
  constructor() {
    super(Notification);
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Recipient
    |--------------------------------------------------------------------------
    */

  async findByRecipient(
    businessId,

    recipientId,

    options = {},
  ) {
    return this.find(
      {
        businessId,

        recipientId,

        status: "active",
      },

      {
        sort: {
          createdAt: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find Unread
    |--------------------------------------------------------------------------
    */

  async findUnread(
    businessId,

    recipientId,

    options = {},
  ) {
    return this.find(
      {
        businessId,

        recipientId,

        notificationStatus: NOTIFICATION_STATUS.UNREAD,

        status: "active",
      },

      {
        sort: {
          createdAt: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Type
    |--------------------------------------------------------------------------
    */

  async findByType(
    businessId,

    type,

    options = {},
  ) {
    return this.find(
      {
        businessId,

        type,

        status: "active",
      },

      {
        sort: {
          createdAt: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Reference
    |--------------------------------------------------------------------------
    */

  async findByReference(
    businessId,

    referenceType,

    referenceId,

    options = {},
  ) {
    return this.find(
      {
        businessId,

        referenceType,

        referenceId,

        status: "active",
      },

      {
        sort: {
          createdAt: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Mark As Read
    |--------------------------------------------------------------------------
    */

  async markAsRead(id, options = {}) {
    return this.update(
      id,

      {
        notificationStatus: NOTIFICATION_STATUS.READ,

        readAt: new Date(),
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Mark All As Read
    |--------------------------------------------------------------------------
    */

  async markAllAsRead(
    businessId,

    recipientId,

    options = {},
  ) {
    return this.updateMany(
      {
        businessId,

        recipientId,

        notificationStatus: NOTIFICATION_STATUS.UNREAD,

        status: "active",
      },

      {
        notificationStatus: NOTIFICATION_STATUS.READ,

        readAt: new Date(),
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Count Unread
    |--------------------------------------------------------------------------
    */

  async countUnread(
    businessId,

    recipientId,
  ) {
    return this.count({
      businessId,

      recipientId,

      notificationStatus: NOTIFICATION_STATUS.UNREAD,

      status: "active",
    });
  }
}

export default new NotificationRepository();
