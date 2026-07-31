import { Queue } from "bullmq";

import BullConnection from "./bull.js";

import { QUEUE_NAMES, JOB_NAMES } from "../constants/index.js";

class NotificationQueue {
  constructor() {
    this.queue = new Queue(
      QUEUE_NAMES.NOTIFICATION,

      {
        connection: BullConnection.getConnection(),

        defaultJobOptions: {
          removeOnComplete: 1000,

          removeOnFail: 5000,

          attempts: 3,

          backoff: {
            type: "exponential",

            delay: 3000,
          },
        },
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Dispatch
    |--------------------------------------------------------------------------
    */

  async dispatch(
    notification,

    options = {},
  ) {
    return this.queue.add(
      JOB_NAMES.SEND_NOTIFICATION,

      notification,

      {
        priority: options.priority,

        delay: options.delay,

        attempts: options.attempts,

        jobId: options.jobId,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Remove Job
    |--------------------------------------------------------------------------
    */

  async remove(jobId) {
    const job = await this.queue.getJob(jobId);

    if (!job) {
      return false;
    }

    await job.remove();

    return true;
  }

  /*
    |--------------------------------------------------------------------------
    | Pause
    |--------------------------------------------------------------------------
    */

  async pause() {
    await this.queue.pause();
  }

  /*
    |--------------------------------------------------------------------------
    | Resume
    |--------------------------------------------------------------------------
    */

  async resume() {
    await this.queue.resume();
  }

  /*
    |--------------------------------------------------------------------------
    | Count
    |--------------------------------------------------------------------------
    */

  async count() {
    return this.queue.count();
  }

  /*
    |--------------------------------------------------------------------------
    | Clean
    |--------------------------------------------------------------------------
    */

  async clean(
    grace = 0,

    limit = 1000,
  ) {
    return this.queue.clean(
      grace,

      limit,

      "completed",
    );
  }
}

export default new NotificationQueue();
