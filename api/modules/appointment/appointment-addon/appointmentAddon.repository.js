import BaseRepository from "../../../shared/base/BaseRepository.js";

import AppointmentAddon from "./appointmentAddon.model.js";

class AppointmentAddonRepository extends BaseRepository {
  constructor() {
    super(AppointmentAddon);
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
            path: "appointmentServiceId",
          },

          {
            path: "serviceAddonId",

            select: "serviceAddonCode name slug",
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
    | Find By Appointment Service
    |--------------------------------------------------------------------------
    */

  async findByAppointmentService(
    businessId,
    appointmentServiceId,
    options = {},
  ) {
    return this.find(
      {
        businessId,

        appointmentServiceId,

        status: "active",
      },

      {
        populate: [
          {
            path: "serviceAddonId",

            select: "serviceAddonCode name slug",
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
    | Find By Service Addon
    |--------------------------------------------------------------------------
    */

  async findByServiceAddon(businessId, serviceAddonId, options = {}) {
    return this.find(
      {
        businessId,

        serviceAddonId,

        status: "active",
      },

      {
        populate: [
          {
            path: "appointmentId",
          },

          {
            path: "appointmentServiceId",
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
    | Find By Appointment Service & Addon
    |--------------------------------------------------------------------------
    */

  async findByAppointmentServiceAndAddon(
    businessId,
    appointmentServiceId,
    serviceAddonId,
  ) {
    return this.findOne({
      businessId,

      appointmentServiceId,

      serviceAddonId,

      status: "active",
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Exists
    |--------------------------------------------------------------------------
    */

  async exists(businessId, appointmentServiceId, serviceAddonId) {
    const addon = await this.findOne({
      businessId,

      appointmentServiceId,

      serviceAddonId,

      status: "active",
    });

    return !!addon;
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
    | Delete By Appointment Service
    |--------------------------------------------------------------------------
    */

  async deleteByAppointmentService(
    businessId,
    appointmentServiceId,
    options = {},
  ) {
    return this.updateMany(
      {
        businessId,

        appointmentServiceId,

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
    | Delete By Service Addon
    |--------------------------------------------------------------------------
    */

  async deleteByServiceAddon(businessId, serviceAddonId, options = {}) {
    return this.updateMany(
      {
        businessId,

        serviceAddonId,

        status: "active",
      },

      {
        status: "deleted",
      },

      options,
    );
  }
}

export default new AppointmentAddonRepository();
