import mongoose from "mongoose";

import BaseSchema from "../../shared/base/BaseSchema.js";

import {
  NOTIFICATION_TYPES,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_STATUS,
  NOTIFICATION_RECIPIENT_TYPES,
  NOTIFICATION_REFERENCE_TYPES,
} from "../../shared/constants/index.js";

const notificationSchema = BaseSchema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Business",

    required: true,

    index: true,
  },

  recipientType: {
    type: String,

    enum: Object.values(NOTIFICATION_RECIPIENT_TYPES),

    required: true,

    index: true,
  },

  recipientId: {
    type: mongoose.Schema.Types.ObjectId,

    required: true,

    index: true,
  },

  title: {
    type: String,

    required: true,

    trim: true,

    maxlength: 150,
  },

  message: {
    type: String,

    required: true,

    trim: true,

    maxlength: 1000,
  },

  type: {
    type: String,

    enum: Object.values(NOTIFICATION_TYPES),

    required: true,

    index: true,
  },

  channel: {
    type: String,

    enum: Object.values(NOTIFICATION_CHANNELS),

    default: NOTIFICATION_CHANNELS.IN_APP,
  },

  referenceType: {
    type: String,

    enum: Object.values(NOTIFICATION_REFERENCE_TYPES),

    default: null,
  },

  referenceId: {
    type: mongoose.Schema.Types.ObjectId,

    default: null,

    index: true,
  },

  data: {
    type: mongoose.Schema.Types.Mixed,

    default: {},
  },

  notificationStatus: {
    type: String,

    enum: Object.values(NOTIFICATION_STATUS),

    default: NOTIFICATION_STATUS.UNREAD,

    index: true,
  },

  readAt: {
    type: Date,

    default: null,
  },
});

notificationSchema.index({
  businessId: 1,

  recipientId: 1,

  notificationStatus: 1,
});

notificationSchema.index({
  businessId: 1,

  type: 1,
});

notificationSchema.index({
  businessId: 1,

  createdAt: -1,
});

const Notification = mongoose.model(
  "Notification",

  notificationSchema,
);

export default Notification;
