import { EventBus, NOTIFICATION_EVENTS } from "../../../shared/events/index.js";

import { NOTIFICATION_CHANNELS } from "../../../shared/constants/index.js";

import { FirebaseGateway } from "../firebase/index.js";

import { EmailGateway } from "../email/index.js";
import { SMSGateway } from "../sms/index.js";
import { WhatsAppGateway } from "../whatsapp/index.js";

class NotificationDispatcher {
  initialize() {
    EventBus.on(
      NOTIFICATION_EVENTS.CREATED,

      async (notification) => {
        await this.dispatch(notification);
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Dispatch
    |--------------------------------------------------------------------------
    */

  async dispatch(notification) {
    const channels = Array.isArray(notification.channel)
      ? notification.channel
      : [notification.channel];

    for (const channel of channels) {
      switch (channel) {
        case NOTIFICATION_CHANNELS.IN_APP:
          switch (notification.event) {
            case NOTIFICATION_EVENTS.CREATED:
              await SocketNotification.created(notification);
              break;

            case NOTIFICATION_EVENTS.READ:
              await SocketNotification.read(notification);
              break;

            case NOTIFICATION_EVENTS.ARCHIVED:
              await SocketNotification.archived(notification);
              break;
          }

        case NOTIFICATION_CHANNELS.PUSH:
          await FirebaseGateway.handle(notification);

          break;

        case NOTIFICATION_CHANNELS.EMAIL:
          await EmailGateway.handle(notification);

          break;

        case NOTIFICATION_CHANNELS.SMS:
          await SMSGateway.handle(notification);

          break;

        case NOTIFICATION_CHANNELS.WHATSAPP:
          await WhatsAppGateway.handle(notification);

          break;

        default:
          break;
      }
    }
  }
}

export default new NotificationDispatcher();
