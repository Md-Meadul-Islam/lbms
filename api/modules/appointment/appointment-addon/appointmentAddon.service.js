import BaseService from "../../../shared/base/BaseService.js";

import ApiError from "../../../shared/errors/ApiError.js";

import AppointmentServiceRepository from "../appointment-service/appointmentService.repository.js";

import ServiceAddonRepository from "../../catalog/service-addon/serviceAddon.repository.js";

import ServiceAddonPriceService from "../../catalog/service-addon-price/serviceAddonPrice.service.js";

import AppointmentAddonRepository from "./appointmentAddon.repository.js";

import { APPOINTMENT_ADDON_MESSAGES } from "./appointmentAddon.constants.js";
import AppointmentServiceService from "../appointment/appointment.service.js";

class AppointmentAddonService extends BaseService {
  constructor() {
    super(AppointmentAddonRepository);
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
        Appointment Service
        -------------------------------------------------
        */

    const appointmentService = await AppointmentServiceRepository.findById(
      data.appointmentServiceId,
    );

    if (!appointmentService) {
      throw new ApiError(
        404,

        APPOINTMENT_ADDON_MESSAGES.APPOINTMENT_SERVICE_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Service Addon
        -------------------------------------------------
        */

    const serviceAddon = await ServiceAddonRepository.findById(
      data.serviceAddonId,
    );

    if (!serviceAddon) {
      throw new ApiError(
        404,

        APPOINTMENT_ADDON_MESSAGES.SERVICE_ADDON_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Duplicate Addon
        -------------------------------------------------
        */

    const exists = await this.repository.exists(
      data.businessId,

      data.appointmentServiceId,

      data.serviceAddonId,
    );

    if (exists) {
      throw new ApiError(
        409,

        "Add-on already added to this appointment service.",
      );
    }

    /*
        -------------------------------------------------
        Current Addon Price
        -------------------------------------------------
        */

    const currentPrice = await ServiceAddonPriceService.getCurrentPrice(
      data.businessId,

      data.serviceAddonId,
    );

    if (!currentPrice) {
      throw new ApiError(
        404,

        APPOINTMENT_ADDON_MESSAGES.ADDON_PRICE_NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Snapshot
        -------------------------------------------------
        */

    data.appointmentId = appointmentService.appointmentId;

    data.addonName = serviceAddon.name;

    data.addonPrice = currentPrice.price;

    data.quantity ??= 1;

    data.subtotal = data.addonPrice * data.quantity;

    data.notes ??= "";

    return data;
  }
  /*
    |--------------------------------------------------------------------------
    | After Create
    |--------------------------------------------------------------------------
    */

  async afterCreate(appointmentAddon) {
    await AppointmentServiceService.recalculateTotals(
      appointmentAddon.businessId,

      appointmentAddon.appointmentId,
    );

    return appointmentAddon;
  }

  /*
    |--------------------------------------------------------------------------
    | Before Update
    |--------------------------------------------------------------------------
    */

  async beforeUpdate(id, data) {
    const appointmentAddon = await this.repository.findById(id);

    if (!appointmentAddon) {
      throw new ApiError(
        404,

        APPOINTMENT_ADDON_MESSAGES.NOT_FOUND,
      );
    }

    /*
        -------------------------------------------------
        Quantity
        -------------------------------------------------
        */

    const quantity = data.quantity ?? appointmentAddon.quantity;

    const addonPrice = data.addonPrice ?? appointmentAddon.addonPrice;

    data.subtotal = quantity * addonPrice;

    return data;
  }

  /*
    |--------------------------------------------------------------------------
    | After Update
    |--------------------------------------------------------------------------
    */

  async afterUpdate(appointmentAddon) {
    await AppointmentServiceService.recalculateTotals(
      appointmentAddon.businessId,

      appointmentAddon.appointmentId,
    );

    return appointmentAddon;
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
    const appointmentAddon = await this.repository.findById(id);

    if (!appointmentAddon) {
      throw new ApiError(
        404,

        APPOINTMENT_ADDON_MESSAGES.NOT_FOUND,
      );
    }

    return appointmentAddon;
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Appointment
    |--------------------------------------------------------------------------
    */

  async getByAppointment(businessId, appointmentId, options = {}) {
    return this.repository.findByAppointment(
      businessId,

      appointmentId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Appointment Service
    |--------------------------------------------------------------------------
    */

  async getByAppointmentService(
    businessId,
    appointmentServiceId,
    options = {},
  ) {
    return this.repository.findByAppointmentService(
      businessId,

      appointmentServiceId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Get By Service Addon
    |--------------------------------------------------------------------------
    */

  async getByServiceAddon(businessId, serviceAddonId, options = {}) {
    return this.repository.findByServiceAddon(
      businessId,

      serviceAddonId,

      options,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

  async delete(id, options = {}) {
    const appointmentAddon = await this.findById(id);

    await this.repository.delete(
      appointmentAddon._id,

      options,
    );

    await AppointmentServiceService.recalculateTotals(
      appointmentAddon.businessId,

      appointmentAddon.appointmentId,
    );

    return true;
  }

  /*
    |--------------------------------------------------------------------------
    | Delete By Appointment
    |--------------------------------------------------------------------------
    */

  async deleteByAppointment(businessId, appointmentId, options = {}) {
    await this.repository.deleteByAppointment(
      businessId,

      appointmentId,

      options,
    );

    await AppointmentServiceService.recalculateTotals(
      businessId,

      appointmentId,
    );

    return true;
  }

  /*
    |--------------------------------------------------------------------------
    | Delete By Appointment Service
    |--------------------------------------------------------------------------
    */

  async deleteByAppointmentService(
    businessId,
    appointmentServiceId,
    options = {},
  ) {
    const appointmentAddons = await this.repository.findByAppointmentService(
      businessId,

      appointmentServiceId,
    );

    await this.repository.deleteByAppointmentService(
      businessId,

      appointmentServiceId,

      options,
    );

    if (appointmentAddons.length > 0) {
      await AppointmentServiceService.recalculateTotals(
        businessId,

        appointmentAddons[0].appointmentId,
      );
    }

    return true;
  }
}

export default new AppointmentAddonService();
