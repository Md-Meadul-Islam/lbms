const requiredVariables = [
  "SMTP_HOST",

  "SMTP_PORT",

  "SMTP_USERNAME",

  "SMTP_PASSWORD",

  "SMTP_FROM",
];

class MailConfig {
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
        `Missing SMTP environment variables: ${missing.join(", ")}`,
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
      host: process.env.SMTP_HOST,

      port: Number(process.env.SMTP_PORT),

      secure: process.env.SMTP_SECURE === "true",

      auth: {
        user: process.env.SMTP_USERNAME,

        pass: process.env.SMTP_PASSWORD,
      },

      from: process.env.SMTP_FROM,
    };
  }
}

export default new MailConfig();
