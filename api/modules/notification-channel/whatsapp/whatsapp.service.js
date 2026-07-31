import WhatsAppClient from "./whatsapp.client.js";

class WhatsAppService {
  /*
    |--------------------------------------------------------------------------
    | Send
    |--------------------------------------------------------------------------
    */

  async send({
    to,

    message,
  }) {
    return WhatsAppClient.send({
      to,

      message,
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
    return this.send({
      to,

      message: `Welcome ${customerName}! Thank you for choosing ${businessName}.`,
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
    return this.send({
      to,

      message: `Hello ${customerName},

Your appointment has been confirmed.

Business: ${businessName}

Service: ${service}

Employee: ${employee}

Date: ${date}

Time: ${time}

Thank you.`,
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

    date,

    time,
  }) {
    return this.send({
      to,

      message: `Hello ${customerName},

Reminder!

Your appointment is scheduled for

${date}

at

${time}.

See you soon.`,
    });
  }

  /*
    |--------------------------------------------------------------------------
    | OTP
    |--------------------------------------------------------------------------
    */

  async sendOTP({
    to,

    otp,
  }) {
    return this.send({
      to,

      message: `Your verification code is

${otp}`,
    });
  }
}

export default new WhatsAppService();
