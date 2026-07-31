import BaseRepository from "../../../shared/base/BaseRepository.js";

import ServiceAssignment from "./serviceAssignment.model.js";

class ServiceAssignmentRepository extends BaseRepository {
  constructor() {
    super(ServiceAssignment);
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Employee & Service
    |--------------------------------------------------------------------------
    */

  async findByEmployeeAndService(businessId, employeeId, serviceId) {
    return this.findOne({
      businessId,

      employeeId,

      serviceId,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Employee
    |--------------------------------------------------------------------------
    */

  async findByEmployee(businessId, employeeId, options = {}) {
    return this.find(
      {
        businessId,

        employeeId,

        status: "active",
      },

      {
        populate: [
          {
            path: "serviceId",

            select: "serviceCode name slug",
          },

          {
            path: "servicePriceId",
          },

          {
            path: "allowedAddonIds",

            select: "addonCode name",
          },
        ],

        sort: {
          priority: 1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Service
    |--------------------------------------------------------------------------
    */

  async findByService(businessId, serviceId, options = {}) {
    return this.find(
      {
        businessId,

        serviceId,

        status: "active",
      },

      {
        populate: [
          {
            path: "employeeId",

            select: "employeeCode firstName lastName fullName",
          },

          {
            path: "servicePriceId",
          },

          {
            path: "allowedAddonIds",

            select: "addonCode name",
          },
        ],

        sort: {
          priority: 1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Primary Employee
    |--------------------------------------------------------------------------
    */

  async findPrimary(businessId, serviceId) {
    return this.findOne({
      businessId,

      serviceId,

      isPrimary: true,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Online Bookable
    |--------------------------------------------------------------------------
    */

  async findOnlineBookable(businessId, serviceId) {
    return this.find(
      {
        businessId,

        serviceId,

        isOnlineBookable: true,

        status: "active",
      },

      {
        sort: {
          priority: 1,
        },
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

  async search(businessId, keyword, options = {}) {
    return this.find(
      {
        businessId,

        status: "active",

        $or: [
          {
            metadata: {
              $regex: keyword,

              $options: "i",
            },
          },
        ],
      },

      {
        populate: ["employeeId", "serviceId"],

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Exists
    |--------------------------------------------------------------------------
    */

  async exists(businessId, employeeId, serviceId) {
    const assignment = await this.findByEmployeeAndService(
      businessId,

      employeeId,

      serviceId,
    );

    return !!assignment;
  }

  /*
    |--------------------------------------------------------------------------
    | Delete By Employee
    |--------------------------------------------------------------------------
    */

  async deleteByEmployee(businessId, employeeId, options = {}) {
    return this.updateMany(
      {
        businessId,

        employeeId,

        status: "active",
      },

      {
        status: "deleted",
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete By Service
    |--------------------------------------------------------------------------
    */

  async deleteByService(businessId, serviceId, options = {}) {
    return this.updateMany(
      {
        businessId,

        serviceId,

        status: "active",
      },

      {
        status: "deleted",
      },

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Employee Services
    |--------------------------------------------------------------------------
    */

  async getEmployeeServices(businessId, employeeId) {
    return this.find(
      {
        businessId,

        employeeId,

        status: "active",
      },

      {
        select: [
          "serviceId",

          "estimatedDuration",

          "priority",

          "commissionType",

          "commissionValue",
        ],
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Service Employees
    |--------------------------------------------------------------------------
    */

  async getServiceEmployees(businessId, serviceId) {
    return this.find(
      {
        businessId,

        serviceId,

        status: "active",
      },

      {
        populate: [
          {
            path: "employeeId",

            select: "employeeCode firstName lastName",
          },
        ],

        sort: {
          priority: 1,
        },
      },
    );
  }
}

export default new ServiceAssignmentRepository();
