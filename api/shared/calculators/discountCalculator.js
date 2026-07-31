class DiscountCalculator {
  calculate({
    amount,

    discountType,

    discountValue,
  }) {
    if (!discountValue) {
      return {
        discount: 0,

        amount,
      };
    }

    let discount = 0;

    switch (discountType) {
      case "percentage":
        discount = (amount * discountValue) / 100;

        break;

      case "fixed":
        discount = discountValue;

        break;

      default:
        discount = 0;
    }

    discount = Math.min(discount, amount);

    return {
      discount,

      amount: amount - discount,
    };
  }
}

export default new DiscountCalculator();
