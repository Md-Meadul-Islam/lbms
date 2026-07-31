import BaseService from "../../shared/base/BaseService.js";

import ApiError from "../../shared/errors/ApiError.js";

import NotificationRepository from "./notification.repository.js";

import {
  NOTIFICATION_RECIPIENT_TYPES,
  NOTIFICATION_STATUS,
} from "../../shared/constants/index.js";

class NotificationService extends BaseService {
  constructor() {
    super(NotificationRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create Notification
    |--------------------------------------------------------------------------
    */

  async create(data, options = {}) {
    return super.create(data, options);
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    data.notificationStatus ??= NOTIFICATION_STATUS.UNREAD;

    data.data ??= {};

    data.readAt ??= null;

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | After Create
    |--------------------------------------------------------------------------
    */

  async afterCreate(notification) {
    /*
        |--------------------------------------------------------------------------
        | Future
        |--------------------------------------------------------------------------
        |
        | Socket.io
        | Firebase Push
        | Email
        | SMS
        | WhatsApp
        |
        */

    return notification;
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Id
    |--------------------------------------------------------------------------
    */

  async findById(id) {
    const notification = await this.repository.findById(id);

    if (!notification) {
      throw new ApiError(
        404,

        "Notification not found.",
      );
    }

    return notification;
  }

  /*
    |--------------------------------------------------------------------------
    | Get Recipient Notifications
    |--------------------------------------------------------------------------
    */

  async getByRecipient(
    businessId,

    recipientId,

    options = {},
  ) {
    return this.repository.findByRecipient(
      businessId,

      recipientId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get Unread
    |--------------------------------------------------------------------------
    */

  async getUnread(
    businessId,

    recipientId,

    options = {},
  ) {
    return this.repository.findUnread(
      businessId,

      recipientId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Type
    |--------------------------------------------------------------------------
    */

  async getByType(
    businessId,

    type,

    options = {},
  ) {
    return this.repository.findByType(
      businessId,

      type,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Reference
    |--------------------------------------------------------------------------
    */

  async getByReference(
    businessId,

    referenceType,

    referenceId,

    options = {},
  ) {
    return this.repository.findByReference(
      businessId,

      referenceType,

      referenceId,

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
    return this.repository.countUnread(
      businessId,

      recipientId,
    );
  }
  /*
    |--------------------------------------------------------------------------
    | Mark As Read
    |--------------------------------------------------------------------------
    */

  async markAsRead(id, options = {}) {
    const notification = await this.findById(id);

    if (notification.notificationStatus === NOTIFICATION_STATUS.READ) {
      return notification;
    }

    return this.repository.markAsRead(
      id,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Mark All As Read
    |--------------------------------------------------------------------------
    */

  async markAllAsRead(businessId, recipientId, options = {}) {
    return this.repository.markAllAsRead(
      businessId,

      recipientId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Archive
    |--------------------------------------------------------------------------
    */

  async archive(id, options = {}) {
    await this.findById(id);

    return this.repository.update(
      id,

      {
        notificationStatus: NOTIFICATION_STATUS.ARCHIVED,
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async delete(id, options = {}) {
    await this.findById(id);

    return this.repository.delete(
      id,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete By Recipient
    |--------------------------------------------------------------------------
    */

  async deleteByRecipient(businessId, recipientId, options = {}) {
    return this.repository.deleteMany(
      {
        businessId,

        recipientId,

        status: "active",
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Send
    |--------------------------------------------------------------------------
    */

  async send(notification, options = {}) {
    return this.create(
      notification,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Broadcast
    |--------------------------------------------------------------------------
    */

  async broadcast(notifications, options = {}) {
    return Promise.all(
      notifications.map((notification) =>
        this.send(
          notification,

          options,
        ),
      ),
    );
  }

  /*
|--------------------------------------------------------------------------
| Notify
|--------------------------------------------------------------------------
*/

  async notify(recipientType, notification, options = {}) {
    return this.send(
      {
        ...notification,

        recipientType,
      },

      options,
    );
  }

  /*
|--------------------------------------------------------------------------
| Notify Employee
|--------------------------------------------------------------------------
*/

  async notifyEmployee(notification, options = {}) {
    return this.notify(
      NOTIFICATION_RECIPIENT_TYPES.EMPLOYEE,

      notification,

      options,
    );
  }

  /*
|--------------------------------------------------------------------------
| Notify Customer
|--------------------------------------------------------------------------
*/

  async notifyCustomer(notification, options = {}) {
    return this.notify(
      NOTIFICATION_RECIPIENT_TYPES.CUSTOMER,

      notification,

      options,
    );
  }

  /*
|--------------------------------------------------------------------------
| Notify Business Owner
|--------------------------------------------------------------------------
*/

  async notifyBusinessOwner(notification, options = {}) {
    return this.notify(
      NOTIFICATION_RECIPIENT_TYPES.BUSINESS_OWNER,

      notification,

      options,
    );
  }

  /*
|--------------------------------------------------------------------------
| Notify Manager
|--------------------------------------------------------------------------
*/

  async notifyManager(notification, options = {}) {
    return this.notify(
      NOTIFICATION_RECIPIENT_TYPES.MANAGER,

      notification,

      options,
    );
  }

  /*
|--------------------------------------------------------------------------
| Notify Receptionist
|--------------------------------------------------------------------------
*/

  async notifyReceptionist(notification, options = {}) {
    return this.notify(
      NOTIFICATION_RECIPIENT_TYPES.RECEPTIONIST,

      notification,

      options,
    );
  }
}

export default new NotificationService();
/**
 *
 * await NotificationService.notify(

    NOTIFICATION_RECIPIENT_TYPES.EMPLOYEE,

    {

        businessId,

        recipientId: employeeId,

        title: "New Appointment",

        message: "John booked Hair Cut.",

        type: NOTIFICATION_TYPES.APPOINTMENT_CREATED,

    }

);
await NotificationService.notify(

    NOTIFICATION_RECIPIENT_TYPES.CUSTOMER,

    {

        businessId,

        recipientId: customerId,

        title: "Appointment Confirmed",

        message: "Your appointment has been confirmed.",

        type: NOTIFICATION_TYPES.APPOINTMENT_CREATED,

    }

);
 */
