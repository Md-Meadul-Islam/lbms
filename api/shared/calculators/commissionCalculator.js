class CommissionCalculator {
  calculate({
    amount,

    commissionType,

    commissionValue,
  }) {
    if (!commissionValue) {
      return {
        commission: 0,
      };
    }

    let commission = 0;

    switch (commissionType) {
      case "percentage":
        commission = (amount * commissionValue) / 100;

        break;

      case "fixed":
        commission = commissionValue;

        break;

      default:
        commission = 0;
    }

    return {
      commission,
    };
  }
}

export default new CommissionCalculator();
