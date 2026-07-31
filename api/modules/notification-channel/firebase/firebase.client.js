import admin from "firebase-admin";

import fs from "fs";

import path from "path";

class FirebaseClient {
  constructor() {
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) {
      return admin;
    }

    const serviceAccount = JSON.parse(
      fs.readFileSync(
        path.resolve("firebase-service-account.json"),

        "utf8",
      ),
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.initialized = true;

    return admin;
  }

  getMessaging() {
    if (!this.initialized) {
      this.initialize();
    }

    return admin.messaging();
  }
}

export default new FirebaseClient();
