import mongoose from "mongoose";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import {
  CUSTOMER_GENDERS,
  CUSTOMER_SOURCES,
  MEMBERSHIP_LEVELS,
} from "./customer.constants.js";

const customerSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  customerCode: {
    type: String,

    required: true,

    index: true,
  },

  firstName: {
    type: String,

    required: true,

    trim: true,
  },

  lastName: {
    type: String,

    default: "",

    trim: true,
  },

  fullName: {
    type: String,

    default: "",
  },

  email: {
    type: String,

    lowercase: true,

    trim: true,

    default: "",
  },

  phone: {
    type: String,

    required: true,

    trim: true,
  },

  avatar: {
    type: String,

    default: "",
  },

  gender: {
    type: String,

    enum: Object.values(CUSTOMER_GENDERS),

    default: CUSTOMER_GENDERS.MALE,
  },

  dateOfBirth: {
    type: Date,

    default: null,
  },

  address: {
    type: String,

    default: "",
  },

  city: {
    type: String,

    default: "",
  },

  state: {
    type: String,

    default: "",
  },

  country: {
    type: String,

    default: "",
  },

  postalCode: {
    type: String,

    default: "",
  },

  membership: {
    level: {
      type: String,

      enum: Object.values(MEMBERSHIP_LEVELS),

      default: MEMBERSHIP_LEVELS.REGULAR,
    },

    joinedAt: {
      type: Date,

      default: Date.now,
    },

    expiresAt: {
      type: Date,

      default: null,
    },

    discount: {
      type: Number,

      default: 0,

      min: 0,
    },
  },

  loyaltyPoints: {
    type: Number,

    default: 0,

    min: 0,
  },

  totalSpent: {
    type: Number,

    default: 0,

    min: 0,
  },

  totalVisits: {
    type: Number,

    default: 0,

    min: 0,
  },

  lastVisit: {
    type: Date,

    default: null,
  },

  source: {
    type: String,

    enum: Object.values(CUSTOMER_SOURCES),

    default: CUSTOMER_SOURCES.WALK_IN,
  },

  notes: {
    type: String,

    default: "",
  },
});

customerSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();

  next();
});

customerSchema.index(
  {
    businessId: 1,
    customerCode: 1,
  },
  {
    unique: true,
  },
);

customerSchema.index(
  {
    businessId: 1,
    phone: 1,
  },
  {
    unique: true,
  },
);

customerSchema.index(
  {
    businessId: 1,
    email: 1,
  },
  {
    sparse: true,
  },
);

customerSchema.index({
  businessId: 1,
  fullName: "text",
  phone: "text",
  email: "text",
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
