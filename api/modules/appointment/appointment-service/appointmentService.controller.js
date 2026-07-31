import BaseController from "../../../shared/base/BaseController.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import AppointmentService from "./appointmentService.service.js";

import { APPOINTMENT_SERVICE_MESSAGES } from "./appointmentService.constants.js";

class AppointmentServiceController extends BaseController {
  constructor() {
    super(AppointmentService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const appointmentService = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: appointmentService,

      message: APPOINTMENT_SERVICE_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const appointmentService = await this.service.findById(req.params.id);

    return this.success(res, {
      data: appointmentService,

      message: APPOINTMENT_SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Appointment
    |--------------------------------------------------------------------------
    */

  getByAppointment = asyncHandler(async (req, res) => {
    const services = await this.service.getByAppointment(
      req.business._id,

      req.params.appointmentId,

      req.query,
    );

    return this.success(res, {
      data: services,

      message: APPOINTMENT_SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Employee
    |--------------------------------------------------------------------------
    */

  getByEmployee = asyncHandler(async (req, res) => {
    const services = await this.service.getByEmployee(
      req.business._id,

      req.params.employeeId,

      req.query,
    );

    return this.success(res, {
      data: services,

      message: APPOINTMENT_SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Service
    |--------------------------------------------------------------------------
    */

  getByService = asyncHandler(async (req, res) => {
    const services = await this.service.getByService(
      req.business._id,

      req.params.serviceId,

      req.query,
    );

    return this.success(res, {
      data: services,

      message: APPOINTMENT_SERVICE_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const appointmentService = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: appointmentService,

      message: APPOINTMENT_SERVICE_MESSAGES.UPDATED,
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
      message: APPOINTMENT_SERVICE_MESSAGES.DELETED,
    });
  });
}

export default new AppointmentServiceController();
