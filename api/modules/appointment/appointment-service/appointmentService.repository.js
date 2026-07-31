import BaseRepository from "../../../shared/base/BaseRepository.js";

import AppointmentService from "./appointmentService.model.js";

class AppointmentServiceRepository extends BaseRepository {
  constructor() {
    super(AppointmentService);
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Appointment
    |--------------------------------------------------------------------------
    */

  async findByAppointment(businessId, appointmentId, options = {}) {
    return this.find(
      {
        businessId,

        appointmentId,

        status: "active",
      },

      {
        populate: [
          {
            path: "serviceId",

            select: "serviceCode name slug",
          },

          {
            path: "employeeId",

            select: "employeeCode firstName lastName fullName",
          },

          {
            path: "serviceAssignmentId",
          },
        ],

        sort: {
          createdAt: 1,
        },

        ...options,
      },
    );
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
            path: "appointmentId",
          },

          {
            path: "serviceId",

            select: "serviceCode name",
          },
        ],

        sort: {
          createdAt: -1,
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
            path: "appointmentId",
          },

          {
            path: "employeeId",

            select: "employeeCode firstName lastName fullName",
          },
        ],

        sort: {
          createdAt: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Status
    |--------------------------------------------------------------------------
    */

  async findByStatus(businessId, appointmentServiceStatus, options = {}) {
    return this.find(
      {
        businessId,

        status: appointmentServiceStatus,
      },

      {
        populate: ["appointmentId", "serviceId", "employeeId"],

        sort: {
          createdAt: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Appointment & Service
    |--------------------------------------------------------------------------
    */

  async findByAppointmentAndService(businessId, appointmentId, serviceId) {
    return this.findOne({
      businessId,

      appointmentId,

      serviceId,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Exists
    |--------------------------------------------------------------------------
    */

  async exists(businessId, appointmentId, serviceId, employeeId) {
    const appointmentService = await this.findOne({
      businessId,

      appointmentId,

      serviceId,

      employeeId,

      status: "active",
    });

    return !!appointmentService;
  }

  /*
    |--------------------------------------------------------------------------
    | Delete By Appointment
    |--------------------------------------------------------------------------
    */

  async deleteByAppointment(businessId, appointmentId, options = {}) {
    return this.updateMany(
      {
        businessId,

        appointmentId,

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
}

export default new AppointmentServiceRepository();
