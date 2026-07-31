import BaseService from "../../../shared/base/BaseService.js";

import ApiError from "../../../shared/errors/ApiError.js";

import CustomerRepository from "../../people/customer/customer.repository.js";

import AppointmentRepository from "./appointment.repository.js";
import PriceCalculator from "../../../shared/calculators/priceCalculator.js";

import {
  APPOINTMENT_MESSAGES,
  APPOINTMENT_STATUS,
} from "./appointment.constants.js";
import { nextAppointmentCode } from "../../sequence/sequence.helper.js";

class AppointmentService extends BaseService {
  constructor() {
    super(AppointmentRepository);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  async create(data, options = {}) {
    return super.create(data, options);
  }

  /*
    |--------------------------------------------------------------------------
    | Before Create
    |--------------------------------------------------------------------------
    */

  async beforeCreate(data) {
    /*
        -------------------------------------------------
        Generate Appointment Code
        -------------------------------------------------
        */

    data.appointmentCode = await nextAppointmentCode({
      businessId: data.businessId,
    });

    /*
        -------------------------------------------------
        Validate Customer
        -------------------------------------------------
        */

    const customer = await CustomerRepository.findById(data.customerId);

    if (!customer) {
      throw new ApiError(
        404,

        APPOINTMENT_MESSAGES.CUSTOMER_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Validate Appointment Date
        -------------------------------------------------
        */

    const appointmentDate = new Date(data.appointmentDate);

    if (Number.isNaN(appointmentDate.getTime())) {
      throw new ApiError(
        400,

        APPOINTMENT_MESSAGES.INVALID_DATE,
      );
    }

    /*
        -------------------------------------------------
        Cannot Book Past Date
        -------------------------------------------------
        */

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(appointmentDate);

    bookingDate.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      throw new ApiError(
        400,

        "Appointment date cannot be in the past.",
      );
    }

    /*
        -------------------------------------------------
        Validate Time Format
        -------------------------------------------------
        */

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(data.startTime)) {
      throw new ApiError(
        400,

        APPOINTMENT_MESSAGES.INVALID_TIME,
      );
    }

    /*
        -------------------------------------------------
        Default Status
        -------------------------------------------------
        */

    data.appointmentStatus = APPOINTMENT_STATUS.PENDING;

    /*
        -------------------------------------------------
        Initial Totals
        -------------------------------------------------
        */

    data.totalDuration = 0;

    data.subtotal = 0;

    data.discount ??= 0;

    data.tax ??= 0;

    data.total = 0;

    /*
        -------------------------------------------------
        Default Notes
        -------------------------------------------------
        */

    data.notes ??= "";

    data.metadata ??= {};

    return data;
  } /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    const appointment = await this.repository.findById(id);

    if (!appointment) {
      throw new ApiError(
        404,

        APPOINTMENT_MESSAGES.NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Validate Customer
        -------------------------------------------------
        */

    if (data.customerId) {
      const customer = await CustomerRepository.findById(data.customerId);

      if (!customer) {
        throw new ApiError(
          404,

          APPOINTMENT_MESSAGES.CUSTOMER_NOT_FOUND,
        );
      }
    }

    /*
        -------------------------------------------------
        Validate Appointment Date
        -------------------------------------------------
        */

    if (data.appointmentDate) {
      const appointmentDate = new Date(data.appointmentDate);

      if (Number.isNaN(appointmentDate.getTime())) {
        throw new ApiError(
          400,

          APPOINTMENT_MESSAGES.INVALID_DATE,
        );
      }
    }

    /*
        -------------------------------------------------
        Validate Time
        -------------------------------------------------
        */

    if (data.startTime) {
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(data.startTime)) {
        throw new ApiError(
          400,

          APPOINTMENT_MESSAGES.INVALID_TIME,
        );
      }
    }

    /*
        -------------------------------------------------
        Completed Appointment
        -------------------------------------------------
        */

    if (appointment.appointmentStatus === APPOINTMENT_STATUS.COMPLETED) {
      throw new ApiError(
        400,

        APPOINTMENT_MESSAGES.ALREADY_COMPLETED,
      );
    }

    /*
        -------------------------------------------------
        Cancelled Appointment
        -------------------------------------------------
        */

    if (appointment.appointmentStatus === APPOINTMENT_STATUS.CANCELLED) {
      throw new ApiError(
        400,

        APPOINTMENT_MESSAGES.ALREADY_CANCELLED,
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
    const appointment = await this.repository.findById(id);

    if (!appointment) {
      throw new ApiError(
        404,

        APPOINTMENT_MESSAGES.NOT_FOUND,
      );
    }

    return appointment;
  }

  /*
    |--------------------------------------------------------------------------
    | Customer Appointments
    |--------------------------------------------------------------------------
    */

  async getByCustomer(businessId, customerId, options = {}) {
    return this.repository.findByCustomer(
      businessId,

      customerId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Appointment Date
    |--------------------------------------------------------------------------
    */

  async getByDate(businessId, appointmentDate, options = {}) {
    return this.repository.findByDate(
      businessId,

      appointmentDate,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

  async getByStatus(businessId, appointmentStatus, options = {}) {
    return this.repository.findByStatus(
      businessId,

      appointmentStatus,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Today's Appointments
    |--------------------------------------------------------------------------
    */

  async getTodayAppointments(businessId) {
    return this.repository.getTodayAppointments(businessId);
  }

  /*
    |--------------------------------------------------------------------------
    | Upcoming Appointments
    |--------------------------------------------------------------------------
    */

  async getUpcomingAppointments(businessId) {
    return this.repository.getUpcomingAppointments(businessId);
  }

  /*
    |--------------------------------------------------------------------------
    | Recalculate Totals
    |--------------------------------------------------------------------------
    */

  async recalculateTotals(businessId, appointmentId) {
    const totals = await PriceCalculator.calculateAppointment(
      businessId,

      appointmentId,
    );

    return this.repository.update(
      appointmentId,

      {
        subtotal: totals.subtotal,

        discount: totals.discount,

        tax: totals.tax,

        total: totals.total,

        totalDuration: totals.totalDuration,
      },
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async delete(id, options = {}) {
    const appointment = await this.findById(id);

    return this.repository.delete(
      appointment._id,

      options,
    );
  }
}

export default new AppointmentService();
