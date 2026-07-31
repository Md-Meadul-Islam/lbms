import IORedis from "ioredis";

import { RedisConfig } from "../config/index.js";

class BullConnection {
  constructor() {
    this.connection = null;
  }

  /*
    |--------------------------------------------------------------------------
    | Get Connection
    |--------------------------------------------------------------------------
    */

  getConnection() {
    if (this.connection) {
      return this.connection;
    }

    this.connection = new IORedis(RedisConfig.config);

    this.connection.on(
      "connect",

      () => {
        console.log("✅ Redis Connected");
      },
    );

    this.connection.on(
      "error",

      (error) => {
        console.error(
          "❌ Redis Error:",

          error,
        );
      },
    );

    return this.connection;
  }

  /*
    |--------------------------------------------------------------------------
    | Disconnect
    |--------------------------------------------------------------------------
    */

  async disconnect() {
    if (!this.connection) {
      return;
    }

    await this.connection.quit();
  }
}

export default new BullConnection();
/**
 * import BullConnection from "../../../shared/queues/bull.js";

const connection = BullConnection.getConnection();
 */
