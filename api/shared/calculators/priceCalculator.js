import DiscountCalculator from "./discountCalculator.js";
import TaxCalculator from "./taxCalculator.js";
import CommissionCalculator from "./commissionCalculator.js";
import appointmentServiceRepository from "../../modules/appointment/appointment-service/appointmentService.repository.js";
import appointmentAddonRepository from "../../modules/appointment/appointment-addon/appointmentAddon.repository.js";

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
  /*
|--------------------------------------------------------------------------
| Appointment Calculator
|--------------------------------------------------------------------------
*/

  async calculateAppointment(businessId, appointmentId) {
    const appointmentServices =
      await appointmentServiceRepository.findByAppointment(
        businessId,

        appointmentId,
      );

    let serviceSubtotal = 0;

    let addonSubtotal = 0;

    let totalDuration = 0;

    for (const service of appointmentServices) {
      serviceSubtotal += Number(service.subtotal || 0);

      totalDuration += Number(service.duration || 0);

      const addons = await appointmentAddonRepository.findByAppointmentService(
        businessId,

        service._id,
      );

      for (const addon of addons) {
        addonSubtotal += Number(addon.subtotal || 0);
      }
    }

    const subtotal = serviceSubtotal + addonSubtotal;

    /*
    ---------------------------------------------------
    Appointment Level Discount
    ---------------------------------------------------
    */

    const discountResult = DiscountCalculator.calculate({
      amount: subtotal,

      discountType: null,

      discountValue: 0,
    });

    /*
    ---------------------------------------------------
    Appointment Level Tax
    ---------------------------------------------------
    */

    const taxResult = TaxCalculator.calculate({
      amount: discountResult.amount,

      taxType: null,

      taxValue: 0,
    });

    return {
      serviceSubtotal,

      addonSubtotal,

      subtotal,

      discount: discountResult.discount,

      tax: taxResult.tax,

      total: taxResult.amount,

      totalDuration,
    };
  }

  async calculateInvoice(businessId, invoiceId) {
    //
  }
  async calculateOrder(businessId, orderId) {
    //
  }
}

export default new PriceCalculator();
