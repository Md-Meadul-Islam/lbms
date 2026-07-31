import BaseController from "../../../shared/base/BaseController.js";

import { asyncHandler } from "../../../shared/helpers/index.js";

import AppointmentAddonService from "./appointmentAddon.service.js";

import { APPOINTMENT_ADDON_MESSAGES } from "./appointmentAddon.constants.js";

class AppointmentAddonController extends BaseController {
  constructor() {
    super(AppointmentAddonService);
  }

  /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

  create = asyncHandler(async (req, res) => {
    const appointmentAddon = await this.service.create({
      ...req.body,

      businessId: req.business._id,

      createdBy: req.user.id,
    });

    return this.created(res, {
      data: appointmentAddon,

      message: APPOINTMENT_ADDON_MESSAGES.CREATED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

  getById = asyncHandler(async (req, res) => {
    const appointmentAddon = await this.service.findById(req.params.id);

    return this.success(res, {
      data: appointmentAddon,

      message: APPOINTMENT_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Appointment
    |--------------------------------------------------------------------------
    */

  getByAppointment = asyncHandler(async (req, res) => {
    const addons = await this.service.getByAppointment(
      req.business._id,

      req.params.appointmentId,

      req.query,
    );

    return this.success(res, {
      data: addons,

      message: APPOINTMENT_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Appointment Service
    |--------------------------------------------------------------------------
    */

  getByAppointmentService = asyncHandler(async (req, res) => {
    const addons = await this.service.getByAppointmentService(
      req.business._id,

      req.params.appointmentServiceId,

      req.query,
    );

    return this.success(res, {
      data: addons,

      message: APPOINTMENT_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Service Addon
    |--------------------------------------------------------------------------
    */

  getByServiceAddon = asyncHandler(async (req, res) => {
    const addons = await this.service.getByServiceAddon(
      req.business._id,

      req.params.serviceAddonId,

      req.query,
    );

    return this.success(res, {
      data: addons,

      message: APPOINTMENT_ADDON_MESSAGES.FETCHED,
    });
  });

  /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

  update = asyncHandler(async (req, res) => {
    req.body.updatedBy = req.user.id;

    const appointmentAddon = await this.service.update(
      req.params.id,

      req.body,
    );

    return this.updated(res, {
      data: appointmentAddon,

      message: APPOINTMENT_ADDON_MESSAGES.UPDATED,
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
      message: APPOINTMENT_ADDON_MESSAGES.DELETED,
    });
  });
}

export default new AppointmentAddonController();
