import mongoose from "mongoose";
import slugify from "slugify";

import BaseSchema from "../../../shared/base/BaseSchema.js";

import {
  CATEGORY_TYPES,
  DEFAULT_CATEGORY_COLOR,
} from "../../../shared/constants/index.js";

const categorySchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  categoryCode: {
    type: String,

    required: true,

    index: true,
  },

  type: {
    type: String,

    enum: Object.values(CATEGORY_TYPES),

    default: CATEGORY_TYPES.SERVICE,

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

    trim: true,

    lowercase: true,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  description: {
    type: String,

    default: "",
  },

  media: {
    icon: {
      type: String,

      default: "",
    },

    thumbnail: {
      type: String,

      default: "",
    },

    banner: {
      type: String,

      default: "",
    },
  },

  color: {
    type: String,

    default: DEFAULT_CATEGORY_COLOR,
  },

  displayOrder: {
    type: Number,

    default: 0,
  },

  parentId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Category",

    default: null,
  },

  level: {
    type: Number,

    default: 1,
  },

  path: {
    type: String,

    default: "",
  },

  ancestors: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Category",
    },
  ],

  isFeatured: {
    type: Boolean,

    default: false,
  },

  isDefault: {
    type: Boolean,

    default: false,
  },
});

categorySchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }

  next();
});

categorySchema.index(
  {
    businessId: 1,
    categoryCode: 1,
  },
  {
    unique: true,
  },
);

categorySchema.index({
  businessId: 1,
  type: 1,
});

categorySchema.index(
  {
    businessId: 1,
    slug: 1,
  },
  {
    unique: true,
  },
);

categorySchema.index({
  businessId: 1,
  parentId: 1,
});

categorySchema.index({
  businessId: 1,
  displayOrder: 1,
});

categorySchema.index({
  businessId: 1,
  name: "text",
  description: "text",
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
