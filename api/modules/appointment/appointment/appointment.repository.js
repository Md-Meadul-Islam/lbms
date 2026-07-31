import BaseRepository from "../../../shared/base/BaseRepository.js";

import Appointment from "./appointment.model.js";

import { APPOINTMENT_STATUS } from "./appointment.constants.js";

class AppointmentRepository extends BaseRepository {
  constructor() {
    super(Appointment);
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Appointment Code
    |--------------------------------------------------------------------------
    */

  async findByCode(businessId, appointmentCode) {
    return this.findOne({
      businessId,

      appointmentCode,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Customer
    |--------------------------------------------------------------------------
    */

  async findByCustomer(businessId, customerId, options = {}) {
    return this.find(
      {
        businessId,

        customerId,

        status: "active",
      },

      {
        sort: {
          appointmentDate: -1,
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

  async findByStatus(businessId, appointmentStatus, options = {}) {
    return this.find(
      {
        businessId,

        status: "active",

        appointmentStatus,
      },

      {
        sort: {
          appointmentDate: -1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find By Date
    |--------------------------------------------------------------------------
    */

  async findByDate(businessId, appointmentDate, options = {}) {
    const start = new Date(appointmentDate);

    start.setHours(0, 0, 0, 0);

    const end = new Date(start);

    end.setHours(23, 59, 59, 999);

    return this.find(
      {
        businessId,

        status: "active",

        appointmentDate: {
          $gte: start,

          $lte: end,
        },
      },

      {
        sort: {
          startTime: 1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Find Between Dates
    |--------------------------------------------------------------------------
    */

  async findBetweenDates(businessId, startDate, endDate, options = {}) {
    return this.find(
      {
        businessId,

        status: "active",

        appointmentDate: {
          $gte: startDate,

          $lte: endDate,
        },
      },

      {
        sort: {
          appointmentDate: 1,

          startTime: 1,
        },

        ...options,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Exists By Code
    |--------------------------------------------------------------------------
    */

  async existsCode(businessId, appointmentCode) {
    const appointment = await this.findByCode(
      businessId,

      appointmentCode,
    );

    return !!appointment;
  }

  /*
    |--------------------------------------------------------------------------
    | Today's Appointments
    |--------------------------------------------------------------------------
    */

  async getTodayAppointments(businessId) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.find(
      {
        businessId,

        status: "active",

        appointmentDate: {
          $gte: today,

          $lt: tomorrow,
        },
      },

      {
        sort: {
          startTime: 1,
        },
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Upcoming Appointments
    |--------------------------------------------------------------------------
    */

  async getUpcomingAppointments(businessId) {
    return this.find(
      {
        businessId,

        status: "active",

        appointmentDate: {
          $gte: new Date(),
        },

        appointmentStatus: {
          $in: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.CONFIRMED],
        },
      },

      {
        sort: {
          appointmentDate: 1,

          startTime: 1,
        },
      },
    );
  }
}

export default new AppointmentRepository();
