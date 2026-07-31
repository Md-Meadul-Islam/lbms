import SMSClient from "./sms.client.js";

class SMSService {
  /*
    |--------------------------------------------------------------------------
    | Send
    |--------------------------------------------------------------------------
    */

  async send({
    to,

    message,
  }) {
    return SMSClient.send({
      to,

      message,
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

      message: `Your verification code is ${otp}.`,
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

      message: `Hello ${customerName}, your appointment is on ${date} at ${time}.`,
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
  }) {
    return this.send({
      to,

      message: `Hello ${customerName}, your appointment at ${businessName} has been confirmed.`,
    });
  }
}

export default new SMSService();
