import SMSService from "./sms.service.js";

class SMSGateway {
  async handle(notification) {
    try {
      const phone = notification.data?.phone;

      if (!phone) {
        return;
      }

      await SMSService.send({
        to: phone,

        message: notification.message,
      });
    } catch (error) {
      console.error(
        "[SMSGateway]",

        error,
      );
    }
  }
}

export default new SMSGateway();
