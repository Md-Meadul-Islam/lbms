import SocketService from "./socket.service.js";

class SocketNotification {
  async created(notification) {
    SocketService.sendToUser(
      notification.recipientId,

      "notification.created",

      notification,
    );
  }

  async read(notification) {
    SocketService.sendToUser(
      notification.recipientId,

      "notification.read",

      notification,
    );
  }

  async archived(notification) {
    SocketService.sendToUser(
      notification.recipientId,

      "notification.archived",

      notification,
    );
  }
}

export default new SocketNotification();
