import mongoose from "mongoose";
import slugify from "slugify";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import {
  DEFAULT_CATEGORY_COLOR,
  SERVICE_DURATIONS,
} from "../../../shared/constants/index.js";

const serviceSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Category",

    required: true,

    index: true,
  },

  serviceCode: {
    type: String,

    required: true,

    unique: true,

    index: true,
  },

  name: {
    type: String,

    required: true,

    trim: true,
  },

  slug: {
    type: String,

    required: true,

    lowercase: true,

    trim: true,
  },

  description: {
    type: String,

    default: "",
  },

  duration: {
    type: Number,

    enum: SERVICE_DURATIONS,

    default: 30,
  },

  image: {
    type: String,

    default: "",
  },

  gallery: [
    {
      type: String,
    },
  ],

  color: {
    type: String,

    default: DEFAULT_CATEGORY_COLOR,
  },

  displayOrder: {
    type: Number,

    default: 0,
  },

  isFeatured: {
    type: Boolean,

    default: false,
  },

  isOnlineBookable: {
    type: Boolean,

    default: true,
  },

  requiresEmployee: {
    type: Boolean,

    default: true,
  },

  metadata: {
    type: mongoose.Schema.Types.Mixed,

    default: {},
  },
});

serviceSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, {
      lower: true,

      strict: true,
    });
  }

  next();
});

serviceSchema.index({
  businessId: 1,

  categoryId: 1,
});

serviceSchema.index(
  {
    businessId: 1,

    slug: 1,
  },
  {
    unique: true,
  },
);

serviceSchema.index(
  {
    businessId: 1,

    serviceCode: 1,
  },
  {
    unique: true,
  },
);

serviceSchema.index({
  businessId: 1,

  name: "text",

  description: "text",
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
