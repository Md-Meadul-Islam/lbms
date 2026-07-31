import BaseService from "../../../shared/base/BaseService.js";

import ApiError from "../../../shared/errors/ApiError.js";

import EmployeeRepository from "../../employee/employee.repository.js";

import ServiceRepository from "../service/service.repository.js";

import ServiceAddonRepository from "../service-addon/serviceAddon.repository.js";

import ServiceAssignmentRepository from "./serviceAssignment.repository.js";

import { SERVICE_ASSIGNMENT_MESSAGES } from "./serviceAssignment.constants.js";

class ServiceAssignmentService extends BaseService {
  constructor() {
    super(ServiceAssignmentRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  async create(data, options = {}) {
    return super.create(
      data,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    /*
        -------------------------------------------------
        Validate Employee
        -------------------------------------------------
        */

    const employee = await EmployeeRepository.findById(data.employeeId);

    if (!employee) {
      throw new ApiError(
        404,

        SERVICE_ASSIGNMENT_MESSAGES.EMPLOYEE_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Validate Service
        -------------------------------------------------
        */

    const service = await ServiceRepository.findById(data.serviceId);

    if (!service) {
      throw new ApiError(
        404,

        SERVICE_ASSIGNMENT_MESSAGES.SERVICE_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Prevent Duplicate Assignment
        -------------------------------------------------
        */

    const exists = await this.repository.exists(
      data.businessId,

      data.employeeId,

      data.serviceId,
    );

    if (exists) {
      throw new ApiError(
        409,

        SERVICE_ASSIGNMENT_MESSAGES.DUPLICATE_ASSIGNMENT,
      );
    }

    /*
        -------------------------------------------------
        Validate Allowed Addons
        -------------------------------------------------
        */

    if (Array.isArray(data.allowedAddonIds) && data.allowedAddonIds.length) {
      const addons = await Promise.all(
        data.allowedAddonIds.map((id) => ServiceAddonRepository.findById(id)),
      );

      const invalidAddon = addons.find((addon) => !addon);

      if (invalidAddon) {
        throw new ApiError(
          400,

          SERVICE_ASSIGNMENT_MESSAGES.INVALID_ADDON,
        );
      }
    }

    /*
        -------------------------------------------------
        Validate Commission
        -------------------------------------------------
        */

    if (data.commissionValue && data.commissionValue < 0) {
      throw new ApiError(
        400,

        "Commission value cannot be negative.",
      );
    }

    /*
        -------------------------------------------------
        Validate Duration
        -------------------------------------------------
        */

    if (!data.estimatedDuration || data.estimatedDuration <= 0) {
      data.estimatedDuration = service.duration || 30;
    }

    /*
        -------------------------------------------------
        Default Values
        -------------------------------------------------
        */

    data.priority ??= 1;

    data.isPrimary ??= false;

    data.isOnlineBookable ??= true;

    data.allowedAddonIds ??= [];

    data.metadata ??= {};

    return data;
  } /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    const assignment = await this.repository.findById(id);

    if (!assignment) {
      throw new ApiError(
        404,

        SERVICE_ASSIGNMENT_MESSAGES.NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Validate Employee
        -------------------------------------------------
        */

    if (data.employeeId) {
      const employee = await EmployeeRepository.findById(data.employeeId);

      if (!employee) {
        throw new ApiError(
          404,

          SERVICE_ASSIGNMENT_MESSAGES.EMPLOYEE_NOT_FOUND,
        );
      }
    }

    /*
        -------------------------------------------------
        Validate Service
        -------------------------------------------------
        */

    if (data.serviceId) {
      const service = await ServiceRepository.findById(data.serviceId);

      if (!service) {
        throw new ApiError(
          404,

          SERVICE_ASSIGNMENT_MESSAGES.SERVICE_NOT_FOUND,
        );
      }
    }

    /*
        -------------------------------------------------
        Duplicate Assignment Check
        -------------------------------------------------
        */

    if (data.employeeId || data.serviceId) {
      const employeeId = data.employeeId || assignment.employeeId;

      const serviceId = data.serviceId || assignment.serviceId;

      const exists = await this.repository.findByEmployeeAndService(
        assignment.businessId,

        employeeId,

        serviceId,
      );

      if (exists && exists._id.toString() !== id) {
        throw new ApiError(
          409,

          SERVICE_ASSIGNMENT_MESSAGES.DUPLICATE_ASSIGNMENT,
        );
      }
    }

    /*
        -------------------------------------------------
        Validate Allowed Addons
        -------------------------------------------------
        */

    if (Array.isArray(data.allowedAddonIds)) {
      const addons = await Promise.all(
        data.allowedAddonIds.map((id) => ServiceAddonRepository.findById(id)),
      );

      if (addons.some((addon) => !addon)) {
        throw new ApiError(
          400,

          SERVICE_ASSIGNMENT_MESSAGES.INVALID_ADDON,
        );
      }
    }

    /*
        -------------------------------------------------
        Validate Duration
        -------------------------------------------------
        */

    if (data.estimatedDuration !== undefined && data.estimatedDuration <= 0) {
      throw new ApiError(
        400,

        "Estimated duration must be greater than zero.",
      );
    }

    /*
        -------------------------------------------------
        Validate Commission
        -------------------------------------------------
        */

    if (data.commissionValue !== undefined && data.commissionValue < 0) {
      throw new ApiError(
        400,

        "Commission value cannot be negative.",
      );
    }

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  async update(id, data, options = {}) {
    return super.update(
      id,

      data,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Id
    |--------------------------------------------------------------------------
    */

  async findById(id) {
    const assignment = await this.repository.findById(id);

    if (!assignment) {
      throw new ApiError(
        404,

        SERVICE_ASSIGNMENT_MESSAGES.NOT_FOUND,
      );
    }

    return assignment;
  }

  /*
    |--------------------------------------------------------------------------
    | Get Employee Assignments
    |--------------------------------------------------------------------------
    */

  async getByEmployee(businessId, employeeId, options = {}) {
    return this.repository.findByEmployee(
      businessId,

      employeeId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get Service Assignments
    |--------------------------------------------------------------------------
    */

  async getByService(businessId, serviceId, options = {}) {
    return this.repository.findByService(
      businessId,

      serviceId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get Primary Assignment
    |--------------------------------------------------------------------------
    */

  async getPrimary(businessId, serviceId) {
    return this.repository.findPrimary(
      businessId,

      serviceId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Online Bookable Employees
    |--------------------------------------------------------------------------
    */

  async getOnlineBookable(businessId, serviceId) {
    return this.repository.findOnlineBookable(
      businessId,

      serviceId,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  async search(businessId, keyword, options = {}) {
    return this.repository.search(
      businessId,

      keyword,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async delete(id, options = {}) {
    const assignment = await this.findById(id);

    return this.repository.delete(
      assignment._id,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete Employee Assignments
    |--------------------------------------------------------------------------
    */

  async deleteByEmployee(businessId, employeeId, options = {}) {
    return this.repository.deleteByEmployee(
      businessId,

      employeeId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete Service Assignments
    |--------------------------------------------------------------------------
    */

  async deleteByService(businessId, serviceId, options = {}) {
    return this.repository.deleteByService(
      businessId,

      serviceId,

      options,
    );
  }
}

export default new ServiceAssignmentService();
