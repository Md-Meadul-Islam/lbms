const requiredVariables = ["REDIS_HOST", "REDIS_PORT"];

class RedisConfig {
  constructor() {
    this.validate();
  }

  /*
    |--------------------------------------------------------------------------
    | Validate
    |--------------------------------------------------------------------------
    */

  validate() {
    const missing = requiredVariables.filter(
      (variable) => !process.env[variable],
    );

    if (missing.length > 0) {
      throw new Error(
        `Missing Redis environment variables: ${missing.join(", ")}`,
      );
    }
  }

  /*
    |--------------------------------------------------------------------------
    | Config
    |--------------------------------------------------------------------------
    */

  get config() {
    return {
      host: process.env.REDIS_HOST,

      port: Number(process.env.REDIS_PORT),

      username: process.env.REDIS_USERNAME || undefined,

      password: process.env.REDIS_PASSWORD || undefined,

      db: Number(process.env.REDIS_DB || 0),

      maxRetriesPerRequest: null,
    };
  }
}

export default new RedisConfig();
