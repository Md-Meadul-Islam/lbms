import BaseRepository from "../../../shared/base/BaseRepository.js";

import Customer from "./customer.model.js";

class CustomerRepository extends BaseRepository {
  constructor() {
    super(Customer);
  }

  async findByEmail(email, businessId) {
    return this.findOne({
      businessId,
      email: email.toLowerCase(),
    });
  }

  async findByPhone(phone, businessId) {
    return this.findOne({
      businessId,
      phone,
    });
  }

  async existsEmail(email, businessId) {
    return this.exists({
      businessId,
      email: email.toLowerCase(),
    });
  }

  async existsPhone(phone, businessId) {
    return this.exists({
      businessId,
      phone,
    });
  }

  async findByCustomerCode(customerCode, businessId) {
    return this.findOne({
      businessId,
      customerCode,
    });
  }

  async findByBusiness(businessId, options = {}) {
    return this.find(
      {
        businessId,
      },
      options,
    );
  }

  async getLastCustomer(businessId) {
    return this.model
      .findOne({
        businessId,
      })
      .sort({
        customerCode: -1,
      });
  }

  async search(businessId, keyword, options = {}) {
    return this.find(
      {
        businessId,
        $or: [
          {
            fullName: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            phone: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            email: {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
      },
      options,
    );
  }

  async findRecentCustomers(businessId, limit = 10) {
    return this.model
      .find({
        businessId,
      })
      .sort({
        createdAt: -1,
      })
      .limit(limit);
  }
}

export default new CustomerRepository();
