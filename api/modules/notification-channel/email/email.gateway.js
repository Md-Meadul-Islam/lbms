import EmailService from "./email.service.js";

import { EventBus, NOTIFICATION_EVENTS } from "../../../shared/events/index.js";

import { NOTIFICATION_CHANNELS } from "../../../shared/constants/index.js";

class EmailGateway {
  async handle(notification) {
    try {
      const email = notification.data?.email;

      if (!email) {
        return;
      }

      await EmailService.sendTemplate({
        to: email,

        subject: notification.title,

        template: notification.data.template,

        variables: notification.data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default new EmailGateway();
/**
 * await NotificationService.notify(

    NOTIFICATION_RECIPIENT_TYPES.CUSTOMER,

    {

        businessId,

        recipientId: customerId,

        title: "Appointment Confirmation",

        message: "Your appointment has been confirmed.",

        channel: NOTIFICATION_CHANNELS.EMAIL,

        data: {

            email: "john@gmail.com",

            template:

                "appointment-confirmation",

            customerName: "John",

            businessName: "SBMS Salon",

            service: "Hair Cut",

            employee: "Alex",

            date: "10 July",

            time: "4:30 PM",

        },

    }

);
 */
