import mongoose from "mongoose";

import { ROLES, STATUS } from "../../shared/constants/index.js";

const authSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
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
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
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

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.BUSINESS_OWNER,
      index: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
      index: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

authSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`.trim();

  next();
});

authSchema.index({
  businessId: 1,
  email: 1,
});

authSchema.index({
  businessId: 1,
  role: 1,
});

authSchema.index({
  businessId: 1,
  status: 1,
});

const User = mongoose.model("User", authSchema);

export default User;
