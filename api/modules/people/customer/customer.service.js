import BaseService from "../../../shared/base/BaseService.js";
import CustomerRepository from "./customer.repository.js";
import ApiError from "../../../shared/errors/ApiError.js";
import { CUSTOMER_MESSAGES } from "./customer.constants.js";
import { nextCustomerCode } from "../../sequence/index.js";

class CustomerService extends BaseService {
  constructor() {
    super(CustomerRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    if (await CustomerRepository.existsPhone(data.phone, data.businessId)) {
      throw new ApiError(409, CUSTOMER_MESSAGES.PHONE_EXISTS);
    }

    if (
      data.email &&
      (await CustomerRepository.existsEmail(data.email, data.businessId))
    ) {
      throw new ApiError(409, CUSTOMER_MESSAGES.EMAIL_EXISTS);
    }

    data.customerCode = await nextCustomerCode(data.businessId);

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  async search(businessId, keyword) {
    return CustomerRepository.search(businessId, keyword);
  }

  /*
    |--------------------------------------------------------------------------
    | Customer List
    |--------------------------------------------------------------------------
    */

  async getCustomers(businessId, query) {
    return CustomerRepository.findByBusiness(businessId, {
      paginate: true,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sort: {
        createdAt: -1,
      },
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Update Loyalty
    |--------------------------------------------------------------------------
    */

  async updateLoyalty(customerId, points, type) {
    const customer = await this.findById(customerId);

    if (type === "add") {
      customer.loyaltyPoints += points;
    } else {
      customer.loyaltyPoints = Math.max(0, customer.loyaltyPoints - points);
    }

    await customer.save();

    return customer;
  }

  /*
    |--------------------------------------------------------------------------
    | Update Last Visit
    |--------------------------------------------------------------------------
    */

  async updateLastVisit(customerId) {
    const customer = await this.findById(customerId);

    customer.lastVisit = new Date();

    customer.totalVisits += 1;

    await customer.save();

    return customer;
  }

  /*
    |--------------------------------------------------------------------------
    | Update Spending
    |--------------------------------------------------------------------------
    */

  async updateTotalSpent(customerId, amount) {
    const customer = await this.findById(customerId);

    customer.totalSpent += amount;

    await customer.save();

    return customer;
  }

  /*
    |--------------------------------------------------------------------------
    | Delete Customer
    |--------------------------------------------------------------------------
    */

  async delete(customerId) {
    /*
        --------------------------------------------------------
        Future Checks
        --------------------------------------------------------

        Appointment

        Sales

        Membership

        Invoice

        */

    return super.delete(customerId);
  }
}

export default new CustomerService();
