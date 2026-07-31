import mongoose from "mongoose";

import BaseSchema from "../../../shared/base/BaseSchema.js";

const appointmentAddonSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Appointment",

    required: true,

    index: true,
  },

  appointmentServiceId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "AppointmentService",

    required: true,

    index: true,
  },

  serviceAddonId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "ServiceAddon",

    required: true,

    index: true,
  },

  quantity: {
    type: Number,

    default: 1,

    min: 1,
  },

  /*
    |--------------------------------------------------------------------------
    | Snapshots
    |--------------------------------------------------------------------------
    */

  addonName: {
    type: String,

    required: true,

    trim: true,
  },

  addonPrice: {
    type: Number,

    required: true,

    min: 0,
  },

  subtotal: {
    type: Number,

    required: true,

    min: 0,
  },

  notes: {
    type: String,

    trim: true,

    maxlength: 500,
  },
});

appointmentAddonSchema.index({
  businessId: 1,

  appointmentServiceId: 1,
});

appointmentAddonSchema.index({
  businessId: 1,

  serviceAddonId: 1,
});

const AppointmentAddon = mongoose.model(
  "AppointmentAddon",

  appointmentAddonSchema,
);

export default AppointmentAddon;
