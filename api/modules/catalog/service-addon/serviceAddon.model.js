import mongoose from "mongoose";
import slugify from "slugify";

import BaseSchema from "../../../shared/base/BaseSchema.js";

const serviceAddonSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Service",

    required: true,

    index: true,
  },

  addonCode: {
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

  image: {
    type: String,

    default: "",
  },

  gallery: [
    {
      type: String,
    },
  ],

  displayOrder: {
    type: Number,

    default: 0,
  },

  isFeatured: {
    type: Boolean,

    default: false,
  },

  isRequired: {
    type: Boolean,

    default: false,
  },

  allowMultiple: {
    type: Boolean,

    default: false,
  },

  maxQuantity: {
    type: Number,

    default: 1,

    min: 1,
  },

  metadata: {
    type: mongoose.Schema.Types.Mixed,

    default: {},
  },
});

serviceAddonSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, {
      lower: true,

      strict: true,
    });
  }

  next();
});

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

serviceAddonSchema.index({
  businessId: 1,

  serviceId: 1,
});

serviceAddonSchema.index(
  {
    businessId: 1,

    serviceId: 1,

    slug: 1,
  },
  {
    unique: true,
  },
);

serviceAddonSchema.index(
  {
    businessId: 1,

    addonCode: 1,
  },
  {
    unique: true,
  },
);

serviceAddonSchema.index({
  businessId: 1,

  serviceId: 1,

  name: "text",

  description: "text",
});

const ServiceAddon = mongoose.model(
  "ServiceAddon",

  serviceAddonSchema,
);

export default ServiceAddon;
