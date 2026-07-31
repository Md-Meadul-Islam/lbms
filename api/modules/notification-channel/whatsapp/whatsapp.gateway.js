import WhatsAppService from "./whatsapp.service.js";

class WhatsAppGateway {
  async handle(notification) {
    try {
      const phone = notification.data?.phone;

      if (!phone) {
        return;
      }

      await WhatsAppService.send({
        to: phone,

        message: notification.message,
      });
    } catch (error) {
      console.error(
        "[WhatsAppGateway]",

        error,
      );
    }
  }
}

export default new WhatsAppGateway();
