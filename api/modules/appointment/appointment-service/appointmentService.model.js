import mongoose from "mongoose";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import { APPOINTMENT_SERVICE_STATUS } from "./appointmentService.constants.js";

const appointmentServiceSchema = BaseSchema({
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

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Service",

    required: true,

    index: true,
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Employee",

    required: true,

    index: true,
  },

  serviceAssignmentId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "ServiceAssignment",

    required: true,
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

  serviceName: {
    type: String,

    required: true,

    trim: true,
  },

  employeeName: {
    type: String,

    required: true,

    trim: true,
  },

  servicePrice: {
    type: Number,

    required: true,

    min: 0,
  },

  duration: {
    type: Number,

    required: true,

    min: 0,
  },

  commissionType: {
    type: String,

    required: true,
  },

  commissionValue: {
    type: Number,

    required: true,

    min: 0,
  },

  subtotal: {
    type: Number,

    required: true,

    min: 0,
  },

  status: {
    type: String,

    enum: Object.values(APPOINTMENT_SERVICE_STATUS),

    default: APPOINTMENT_SERVICE_STATUS.PENDING,
  },

  notes: {
    type: String,

    trim: true,

    maxlength: 500,
  },
});

appointmentServiceSchema.index({
  businessId: 1,

  appointmentId: 1,
});

appointmentServiceSchema.index({
  businessId: 1,

  employeeId: 1,
});

appointmentServiceSchema.index({
  businessId: 1,

  serviceId: 1,
});

appointmentServiceSchema.index({
  businessId: 1,

  status: 1,
});

const AppointmentService = mongoose.model(
  "AppointmentService",

  appointmentServiceSchema,
);

export default AppointmentService;
