import mongoose from "mongoose";

import { STATUS } from "../constants/index.js";

const BaseSchema = (definition = {}, options = {}) => {
  const schema = new mongoose.Schema(
    {
      ...definition,

      status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ACTIVE,
        index: true,
      },

      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        index: true,
      },

      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      isDeleted: {
        type: Boolean,
        default: false,
        index: true,
      },

      deletedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
      ...options,
    },
  );

  /*
    |--------------------------------------------------------------------------
    | Query Middleware
    |--------------------------------------------------------------------------
    */

  schema.pre(/^find/, function (next) {
    if (!this.getQuery().includeDeleted) {
      this.where({
        isDeleted: false,
      });
    }

    delete this.getQuery().includeDeleted;

    next();
  });

  /*
    |--------------------------------------------------------------------------
    | Soft Delete
    |--------------------------------------------------------------------------
    */

  schema.methods.softDelete = async function (userId = null) {
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.deletedBy = userId;

    return this.save();
  };

  schema.methods.restore = async function () {
    this.isDeleted = false;
    this.deletedAt = null;
    this.deletedBy = null;

    return this.save();
  };

  return schema;
};

export default BaseSchema;
/**
 * import BaseSchema from "../../shared/base/BaseSchema.js";

const serviceSchema = BaseSchema({

    businessId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Business",

        required: true,

        index: true,
    },

    name: {

        type: String,

        required: true,

        trim: true,
    },

    duration: {

        type: Number,

        required: true,
    },

    price: {

        type: Number,

        required: true,
    },

});

 */
