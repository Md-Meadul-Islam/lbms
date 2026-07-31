import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      index: true,
    },

    key: {
      type: String,
      required: true,
      trim: true,
    },

    prefix: {
      type: String,
      required: true,
      trim: true,
    },

    separator: {
      type: String,
      default: "-",
    },

    padding: {
      type: Number,
      default: 6,
      min: 1,
      max: 20,
    },

    nextNumber: {
      type: Number,
      default: 1,
      min: 1,
    },

    suffix: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

sequenceSchema.index(
  {
    businessId: 1,
    key: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("Sequence", sequenceSchema);
