import mongoose from "mongoose";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import { COMMISSION_TYPES } from "../../../shared/constants/index.js";

const serviceAssignmentSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Employee",

    required: true,

    index: true,
  },

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Service",

    required: true,

    index: true,
  },

  servicePriceId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "ServicePrice",

    required: true,
  },

  allowedAddonIds: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "ServiceAddon",
    },
  ],

  estimatedDuration: {
    type: Number,

    required: true,

    min: 1,

    default: 30,
  },

  commissionType: {
    type: String,

    enum: Object.values(COMMISSION_TYPES),

    default: COMMISSION_TYPES.PERCENTAGE,
  },

  commissionValue: {
    type: Number,

    default: 0,

    min: 0,
  },

  priority: {
    type: Number,

    default: 1,

    min: 1,
  },

  isPrimary: {
    type: Boolean,

    default: false,
  },

  isOnlineBookable: {
    type: Boolean,

    default: true,
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

serviceAssignmentSchema.index(
  {
    businessId: 1,

    employeeId: 1,

    serviceId: 1,
  },
  {
    unique: true,
  },
);

serviceAssignmentSchema.index({
  businessId: 1,

  serviceId: 1,
});

serviceAssignmentSchema.index({
  businessId: 1,

  employeeId: 1,
});

serviceAssignmentSchema.index({
  businessId: 1,

  priority: 1,
});

const ServiceAssignment = mongoose.model(
  "ServiceAssignment",

  serviceAssignmentSchema,
);

export default ServiceAssignment;
