import FirebaseService from "./firebase.service.js";

import { EventBus, NOTIFICATION_EVENTS } from "../../../shared/events/index.js";

class FirebaseGateway {
  initialize() {
    EventBus.on(
      NOTIFICATION_EVENTS.CREATED,

      async (notification) => {
        /*
                ----------------------------------------------------
                TODO
                ----------------------------------------------------

                Get recipient's FCM tokens from database.

                Example:

                const tokens =
                    await DeviceTokenRepository.findTokens(
                        notification.recipientId
                    );

                ----------------------------------------------------
                */

        const tokens = [];

        if (tokens.length === 0) {
          return;
        }

        await FirebaseService.sendToMany(
          tokens,

          {
            title: notification.title,

            message: notification.message,
          },

          {
            notificationId: notification._id.toString(),
          },
        );
      },
    );
  }
}

export default new FirebaseGateway();
