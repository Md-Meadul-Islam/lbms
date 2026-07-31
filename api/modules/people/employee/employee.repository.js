import BaseRepository from "../../../shared/base/BaseRepository.js";

import Employee from "./employee.model.js";

class EmployeeRepository extends BaseRepository {
  constructor() {
    super(Employee);
  }

  async findByEmail(email) {
    return this.findOne(
      {
        email: email.toLowerCase(),
      },
      {
        select: "+password",
      },
    );
  }

  async emailExists(email, businessId) {
    return this.exists({
      email: email.toLowerCase(),
      businessId,
    });
  }

  async codeExists(employeeCode, businessId) {
    return this.exists({
      employeeCode,
      businessId,
    });
  }

  async findByEmployeeCode(employeeCode, businessId) {
    return this.findOne({
      employeeCode,
      businessId,
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

  async findManagers(businessId) {
    return this.find({
      businessId,
      role: "manager",
    });
  }

  async findActiveEmployees(businessId) {
    return this.find({
      businessId,
      status: "active",
    });
  }

  async getLastEmployee(businessId) {
    return this.model
      .findOne({
        businessId,
      })
      .sort({
        employeeCode: -1,
      });
  }
}

export default new EmployeeRepository();
