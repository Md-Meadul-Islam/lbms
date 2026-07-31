import mongoose from "mongoose";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import { TAX_TYPES, DISCOUNT_TYPES } from "../../../shared/constants/index.js";

const serviceAddonPriceSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  addonId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "ServiceAddon",

    required: true,

    index: true,
  },

  priceCode: {
    type: String,

    required: true,

    unique: true,

    index: true,
  },

  costPrice: {
    type: Number,

    required: true,

    min: 0,

    default: 0,
  },

  sellingPrice: {
    type: Number,

    required: true,

    min: 0,
  },

  taxType: {
    type: String,

    enum: Object.values(TAX_TYPES),

    default: TAX_TYPES.PERCENTAGE,
  },

  taxValue: {
    type: Number,

    default: 0,

    min: 0,
  },

  discountType: {
    type: String,

    enum: Object.values(DISCOUNT_TYPES),

    default: DISCOUNT_TYPES.FIXED,
  },

  discountValue: {
    type: Number,

    default: 0,

    min: 0,
  },

  effectiveFrom: {
    type: Date,

    required: true,

    default: Date.now,
  },

  effectiveTo: {
    type: Date,

    default: null,
  },

  isDefault: {
    type: Boolean,

    default: true,
  },

  notes: {
    type: String,

    trim: true,

    default: "",
  },
});

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

serviceAddonPriceSchema.index({
  businessId: 1,

  addonId: 1,
});

serviceAddonPriceSchema.index({
  businessId: 1,

  addonId: 1,

  isDefault: 1,
});

serviceAddonPriceSchema.index({
  businessId: 1,

  effectiveFrom: -1,
});

serviceAddonPriceSchema.index(
  {
    businessId: 1,

    priceCode: 1,
  },
  {
    unique: true,
  },
);

const ServiceAddonPrice = mongoose.model(
  "ServiceAddonPrice",

  serviceAddonPriceSchema,
);

export default ServiceAddonPrice;
