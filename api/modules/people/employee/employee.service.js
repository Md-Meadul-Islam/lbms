import BaseService from "../../../shared/base/BaseService.js";

import EmployeeRepository from "./employee.repository.js";

import ApiError from "../../../shared/errors/ApiError.js";

import { hashPassword } from "../../../shared/helpers/index.js";

import {
  DEFAULT_PERMISSIONS,
  EMPLOYEE_MESSAGES,
} from "./employee.constants.js";
import { nextEmployeeCode } from "../../sequence/index.js";

class EmployeeService extends BaseService {
  constructor() {
    super(EmployeeRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    const exists = await EmployeeRepository.emailExists(
      data.email,
      data.businessId,
    );

    if (exists) {
      throw new ApiError(409, EMPLOYEE_MESSAGES.EMAIL_EXISTS);
    }

    data.employeeCode = await nextEmployeeCode(data.businessId);

    data.password = await hashPassword(data.password);

    data.permissions = DEFAULT_PERMISSIONS[data.role] || [];

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    if (data.password) {
      delete data.password;
    }

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | List Employees
    |--------------------------------------------------------------------------
    */

  async getEmployees(businessId, query) {
    return EmployeeRepository.find(
      {
        businessId,
      },
      {
        paginate: true,
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 10,
        sort: {
          createdAt: -1,
        },
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

  async getEmployee(id) {
    const employee = await this.findById(id);

    if (!employee) {
      throw new ApiError(404, EMPLOYEE_MESSAGES.NOT_FOUND);
    }

    return employee;
  }

  /*
    |--------------------------------------------------------------------------
    | Reset Password
    |--------------------------------------------------------------------------
    */

  async resetPassword(id, password) {
    const employee = await this.findById(id);

    if (!employee) {
      throw new ApiError(404, EMPLOYEE_MESSAGES.NOT_FOUND);
    }

    employee.password = await hashPassword(password);

    await employee.save();

    return employee;
  }

  /*
    |--------------------------------------------------------------------------
    | Change Status
    |--------------------------------------------------------------------------
    */

  async changeStatus(id, status) {
    return this.update(id, {
      status,
    });
  }
}

export default new EmployeeService();
