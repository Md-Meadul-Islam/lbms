import nodemailer from "nodemailer";
import { MailConfig } from "../../../shared/config/index.js";

class EmailClient {
  constructor() {
    this.transporter = null;
  }

  /*
    |--------------------------------------------------------------------------
    | Initialize
    |--------------------------------------------------------------------------
    */

  initialize() {
    if (this.transporter) {
      return this.transporter;
    }

    this.transporter = nodemailer.createTransport(MailConfig.config);

    return this.transporter;
  }

  /*
    |--------------------------------------------------------------------------
    | Send
    |--------------------------------------------------------------------------
    */

  async send({
    to,

    cc,

    bcc,

    subject,

    html,

    text,

    attachments = [],
  }) {
    const transporter = this.initialize();

    return transporter.sendMail({
      from: MailConfig.config.from,

      to,

      cc,

      bcc,

      subject,

      html,

      text,

      attachments,
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Verify Connection
    |--------------------------------------------------------------------------
    */

  async verify() {
    const transporter = this.initialize();

    return transporter.verify();
  }
}

export default new EmailClient();
