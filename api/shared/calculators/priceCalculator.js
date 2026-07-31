import DiscountCalculator from "./discountCalculator.js";
import TaxCalculator from "./taxCalculator.js";
import CommissionCalculator from "./commissionCalculator.js";

class PriceCalculator {
  calculate(price) {
    const basePrice = Number(price.sellingPrice || 0);

    /*
        -----------------------------
        Discount
        -----------------------------
        */

    const discountResult = DiscountCalculator.calculate({
      amount: basePrice,

      discountType: price.discountType,

      discountValue: price.discountValue,
    });

    /*
        -----------------------------
        Tax
        -----------------------------
        */

    const taxResult = TaxCalculator.calculate({
      amount: discountResult.amount,

      taxType: price.taxType,

      taxValue: price.taxValue,
    });

    /*
        -----------------------------
        Commission
        -----------------------------
        */

    const commissionResult = CommissionCalculator.calculate({
      amount: taxResult.amount,

      commissionType: price.commissionType,

      commissionValue: price.commissionValue,
    });

    /*
        -----------------------------
        Profit
        -----------------------------
        */

    const costPrice = Number(price.costPrice || 0);

    const profit = taxResult.amount - costPrice;

    return {
      costPrice,

      sellingPrice: basePrice,

      discount: discountResult.discount,

      tax: taxResult.tax,

      commission: commissionResult.commission,

      subtotal: discountResult.amount,

      total: taxResult.amount,

      profit,

      payable: taxResult.amount,
    };
  }
}

export default new PriceCalculator();
