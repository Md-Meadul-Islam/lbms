import FirebaseClient from "./firebase.client.js";

class FirebaseService {
  async send(token, notification, data = {}) {
    if (!token) {
      return null;
    }

    const messaging = FirebaseClient.getMessaging();

    return messaging.send({
      token,

      notification: {
        title: notification.title,

        body: notification.message,
      },

      data,
    });
  }

  async sendToMany(
    tokens,

    notification,

    data = {},
  ) {
    if (!tokens || tokens.length === 0) {
      return null;
    }

    const messaging = FirebaseClient.getMessaging();

    return messaging.sendEachForMulticast({
      tokens,

      notification: {
        title: notification.title,

        body: notification.message,
      },

      data,
    });
  }
}

export default new FirebaseService();
