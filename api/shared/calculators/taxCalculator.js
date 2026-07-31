class TaxCalculator {
  calculate({
    amount,

    taxType,

    taxValue,
  }) {
    if (!taxValue) {
      return {
        tax: 0,

        amount,
      };
    }

    let tax = 0;

    switch (taxType) {
      case "percentage":
        tax = (amount * taxValue) / 100;

        break;

      case "fixed":
        tax = taxValue;

        break;

      default:
        tax = 0;
    }

    return {
      tax,

      amount: amount + tax,
    };
  }
}

export default new TaxCalculator();
