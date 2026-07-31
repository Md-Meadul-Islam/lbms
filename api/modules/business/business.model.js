import mongoose from "mongoose";

import BaseSchema from "../../shared/base/BaseSchema.js";

import { BUSINESS_TYPES } from "../../shared/constants/index.js";

const businessSchema = BaseSchema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  businessType: {
    type: String,
    enum: Object.values(BUSINESS_TYPES),
    required: true,
  },

  enabledModules: [
    {
      key: {
        type: String,
        required: true,
      },

      enabled: {
        type: Boolean,
        default: true,
      },

      enabledAt: Date,

      enabledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],

  logo: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
  },

  phone: {
    type: String,
    trim: true,
  },

  website: {
    type: String,
    default: "",
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

  timezone: {
    type: String,
    default: "Asia/Dhaka",
  },

  currency: {
    type: String,
    default: "BDT",
  },

  settings: {
    allowNegativeStock: {
      type: Boolean,
      default: false,
    },

    taxIncluded: {
      type: Boolean,
      default: false,
    },

    invoicePrefix: {
      type: String,
      default: "INV",
    },

    language: {
      type: String,
      default: "en",
    },
  },
});

businessSchema.index({
  ownerId: 1,
});

businessSchema.index({
  businessType: 1,
});

const Business = mongoose.model("Business", businessSchema);

export default Business;
