import EmailClient from "./email.client.js";
import EmailTemplate from "./email.template.js";

class EmailService {
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
    return EmailClient.send({
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
    | Send Template
    |--------------------------------------------------------------------------
    */

  async sendTemplate({
    to,

    cc,

    bcc,

    subject,

    template,

    variables = {},

    attachments = [],
  }) {
    const html = await EmailTemplate.render(
      template,

      variables,
    );

    return this.send({
      to,

      cc,

      bcc,

      subject,

      html,

      attachments,
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Welcome
    |--------------------------------------------------------------------------
    */

  async sendWelcome({
    to,

    customerName,

    businessName,
  }) {
    return this.sendTemplate({
      to,

      subject: `Welcome to ${businessName}`,

      template: "welcome",

      variables: {
        customerName,

        businessName,
      },
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Appointment Confirmation
    |--------------------------------------------------------------------------
    */

  async sendAppointmentConfirmation({
    to,

    customerName,

    businessName,

    service,

    employee,

    date,

    time,
  }) {
    return this.sendTemplate({
      to,

      subject: "Appointment Confirmation",

      template: "appointment-confirmation",

      variables: {
        customerName,

        businessName,

        service,

        employee,

        date,

        time,
      },
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Appointment Reminder
    |--------------------------------------------------------------------------
    */

  async sendAppointmentReminder({
    to,

    customerName,

    businessName,

    service,

    employee,

    date,

    time,
  }) {
    return this.sendTemplate({
      to,

      subject: "Appointment Reminder",

      template: "appointment-reminder",

      variables: {
        customerName,

        businessName,

        service,

        employee,

        date,

        time,
      },
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Password Reset
    |--------------------------------------------------------------------------
    */

  async sendPasswordReset({
    to,

    customerName,

    resetLink,
  }) {
    return this.sendTemplate({
      to,

      subject: "Reset Password",

      template: "password-reset",

      variables: {
        customerName,

        resetLink,
      },
    });
  }

  /*
    |--------------------------------------------------------------------------
    | OTP
    |--------------------------------------------------------------------------
    */

  async sendOTP({
    to,

    customerName,

    otp,
  }) {
    return this.sendTemplate({
      to,

      subject: "Verification Code",

      template: "otp",

      variables: {
        customerName,

        otp,
      },
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Invoice
    |--------------------------------------------------------------------------
    */

  async sendInvoice({
    to,

    customerName,

    invoiceNumber,

    total,

    businessName,

    attachments = [],
  }) {
    return this.sendTemplate({
      to,

      subject: `Invoice ${invoiceNumber}`,

      template: "invoice",

      attachments,

      variables: {
        customerName,

        invoiceNumber,

        total,

        businessName,
      },
    });
  }
}

export default new EmailService();
/**
 * await EmailService.sendWelcome({

    to: "john@gmail.com",

    customerName: "John",

    businessName: "SBMS Salon",

});
await EmailService.sendAppointmentConfirmation({

    to: "john@gmail.com",

    customerName: "John",

    businessName: "SBMS Salon",

    service: "Hair Cut",

    employee: "Alex",

    date: "10 July",

    time: "4:30 PM",

});
 */
