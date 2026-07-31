import mongoose from "mongoose";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import { APPOINTMENT_STATUS } from "./appointment.constants.js";

const appointmentSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  appointmentCode: {
    type: String,

    required: true,

    trim: true,

    uppercase: true,
  },

  customerId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Customer",

    required: true,

    index: true,
  },

  appointmentDate: {
    type: Date,

    required: true,

    index: true,
  },

  startTime: {
    type: String,

    required: true,
  },

  endTime: {
    type: String,
  },

  status: {
    type: String,

    enum: Object.values(APPOINTMENT_STATUS),

    default: APPOINTMENT_STATUS.PENDING,
  },

  totalDuration: {
    type: Number,

    default: 0,

    min: 0,
  },

  subtotal: {
    type: Number,

    default: 0,

    min: 0,
  },

  discount: {
    type: Number,

    default: 0,

    min: 0,
  },

  tax: {
    type: Number,

    default: 0,

    min: 0,
  },

  total: {
    type: Number,

    default: 0,

    min: 0,
  },

  notes: {
    type: String,

    trim: true,

    maxlength: 1000,
  },

  metadata: {
    type: mongoose.Schema.Types.Mixed,

    default: {},
  },
});

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

appointmentSchema.index(
  {
    businessId: 1,

    appointmentCode: 1,
  },
  {
    unique: true,
  },
);

appointmentSchema.index({
  businessId: 1,

  customerId: 1,
});

appointmentSchema.index({
  businessId: 1,

  appointmentDate: 1,
});

appointmentSchema.index({
  businessId: 1,

  status: 1,
});

const Appointment = mongoose.model(
  "Appointment",

  appointmentSchema,
);

export default Appointment;
