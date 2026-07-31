class SMSClient {
  /*
    |--------------------------------------------------------------------------
    | Send SMS
    |--------------------------------------------------------------------------
    */

  async send({
    to,

    message,
  }) {
    /*
        |--------------------------------------------------------------------------
        | TODO
        |--------------------------------------------------------------------------
        |
        | Integrate your SMS provider here.
        |
        | Example:
        |
        | await twilio.messages.create({
        |     body: message,
        |     to,
        |     from: process.env.SMS_FROM
        | });
        |
        */

    console.log(
      "[SMS]",

      {
        to,

        message,
      },
    );

    return {
      success: true,
    };
  }
}

export default new SMSClient();
