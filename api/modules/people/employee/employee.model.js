import mongoose from "mongoose";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import { ROLES, STATUS } from "../../../shared/constants/index.js";

import { EMPLOYMENT_TYPES, GENDERS } from "./employee.constants.js";

const employeeSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  employeeCode: {
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

    required: true,

    lowercase: true,

    trim: true,
  },

  phone: {
    type: String,

    default: "",

    trim: true,
  },

  password: {
    type: String,

    required: true,

    select: false,
  },

  avatar: {
    type: String,

    default: "",
  },

  gender: {
    type: String,

    enum: Object.values(GENDERS),

    default: GENDERS.MALE,
  },

  dateOfBirth: {
    type: Date,

    default: null,
  },

  joiningDate: {
    type: Date,

    default: Date.now,
  },

  designation: {
    type: String,

    default: "",
  },

  department: {
    type: String,

    default: "",
  },

  employmentType: {
    type: String,

    enum: Object.values(EMPLOYMENT_TYPES),

    default: EMPLOYMENT_TYPES.FULL_TIME,
  },

  salary: {
    type: Number,

    default: 0,

    min: 0,
  },

  commission: {
    type: Number,

    default: 0,

    min: 0,
  },

  role: {
    type: String,

    enum: Object.values(ROLES),

    default: ROLES.STAFF,

    index: true,
  },

  permissions: [
    {
      type: String,
    },
  ],

  lastLoginAt: {
    type: Date,

    default: null,
  },

  notes: {
    type: String,

    default: "",
  },
});

employeeSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();

  next();
});

employeeSchema.index(
  {
    businessId: 1,
    employeeCode: 1,
  },
  {
    unique: true,
  },
);

employeeSchema.index(
  {
    businessId: 1,
    email: 1,
  },
  {
    unique: true,
  },
);

employeeSchema.index({
  businessId: 1,
  role: 1,
});

employeeSchema.index({
  businessId: 1,
  status: 1,
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
