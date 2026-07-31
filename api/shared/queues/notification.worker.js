import { Worker } from "bullmq";

import BullConnection from "./bull.js";

import NotificationDispatcher from "../../modules/notification-channel/dispatcher/notification.dispatcher.js";

import { QUEUE_NAMES, JOB_NAMES } from "../constants/index.js";

class NotificationWorker {
  constructor() {
    this.worker = null;
  }

  /*
    |--------------------------------------------------------------------------
    | Initialize
    |--------------------------------------------------------------------------
    */

  initialize() {
    if (this.worker) {
      return this.worker;
    }

    this.worker = new Worker(
      QUEUE_NAMES.NOTIFICATION,

      async (job) => {
        switch (job.name) {
          case JOB_NAMES.SEND_NOTIFICATION:
            await NotificationDispatcher.dispatch(job.data);

            break;

          default:
            break;
        }
      },

      {
        connection: BullConnection.getConnection(),

        concurrency: 10,
      },
    );

    /*
          |--------------------------------------------------------------------------
          | Completed
          |--------------------------------------------------------------------------
          */

    this.worker.on(
      "completed",

      (job) => {
        console.log(`✅ Notification Job Completed: ${job.id}`);
      },
    );

    /*
          |--------------------------------------------------------------------------
          | Failed
          |--------------------------------------------------------------------------
          */

    this.worker.on(
      "failed",

      (job, error) => {
        console.error(
          `❌ Notification Job Failed: ${job?.id}`,

          error,
        );
      },
    );

    /*
          |--------------------------------------------------------------------------
          | Error
          |--------------------------------------------------------------------------
          */

    this.worker.on(
      "error",

      (error) => {
        console.error(
          "Notification Worker Error:",

          error,
        );
      },
    );

    return this.worker;
  }

  /*
    |--------------------------------------------------------------------------
    | Close
    |--------------------------------------------------------------------------
    */

  async close() {
    if (!this.worker) {
      return;
    }

    await this.worker.close();
  }
}

export default new NotificationWorker();
