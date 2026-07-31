class WhatsAppClient {
  /*
    |--------------------------------------------------------------------------
    | Send Message
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
        | Integrate WhatsApp provider here.
        |
        | Example:
        |
        | await axios.post(
        |     META_API_URL,
        |     {...},
        |     {
        |         headers: {
        |             Authorization: `Bearer ${TOKEN}`
        |         }
        |     }
        | );
        |
        */

    console.log(
      "[WhatsApp]",

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

export default new WhatsAppClient();
