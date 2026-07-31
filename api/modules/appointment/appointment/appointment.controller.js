import BaseController from "../../../shared/base/BaseController.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import AppointmentService from "./appointment.service.js";

import { APPOINTMENT_MESSAGES } from "./appointment.constants.js";

class AppointmentController extends BaseController {
  constructor() {
    super(AppointmentService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const appointment = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: appointment,

      message: APPOINTMENT_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const appointment = await this.service.findById(req.params.id);

    return this.success(res, {
      data: appointment,

      message: APPOINTMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Customer Appointments
    |--------------------------------------------------------------------------
    */

  getByCustomer = asyncHandler(async (req, res) => {
    const appointments = await this.service.getByCustomer(
      req.business._id,

      req.params.customerId,

      req.query,
    );

    return this.success(res, {
      data: appointments,

      message: APPOINTMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Appointment Date
    |--------------------------------------------------------------------------
    */

  getByDate = asyncHandler(async (req, res) => {
    const appointments = await this.service.getByDate(
      req.business._id,

      req.params.date,

      req.query,
    );

    return this.success(res, {
      data: appointments,

      message: APPOINTMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Appointment Status
    |--------------------------------------------------------------------------
    */

  getByStatus = asyncHandler(async (req, res) => {
    const appointments = await this.service.getByStatus(
      req.business._id,

      req.params.status,

      req.query,
    );

    return this.success(res, {
      data: appointments,

      message: APPOINTMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Today's Appointments
    |--------------------------------------------------------------------------
    */

  getTodayAppointments = asyncHandler(async (req, res) => {
    const appointments = await this.service.getTodayAppointments(
      req.business._id,
    );

    return this.success(res, {
      data: appointments,

      message: APPOINTMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Upcoming Appointments
    |--------------------------------------------------------------------------
    */

  getUpcomingAppointments = asyncHandler(async (req, res) => {
    const appointments = await this.service.getUpcomingAppointments(
      req.business._id,
    );

    return this.success(res, {
      data: appointments,

      message: APPOINTMENT_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const appointment = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: appointment,

      message: APPOINTMENT_MESSAGES.UPDATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  delete = asyncHandler(async (req, res) => {
    await this.service.delete(req.params.id);

    return this.deleted(res, {
      message: APPOINTMENT_MESSAGES.DELETED,
    });
  });
}

export default new AppointmentController();
