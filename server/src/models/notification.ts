import mongoose, { Schema, InferSchemaType, model } from 'mongoose';
import { NOTIFICATIONTYPE } from '../types';

const NotificationSchema = new Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    linkedTo: String,
    type: {
      type: String,
      enum: [NOTIFICATIONTYPE.INVOICE],
    },
    status: {
      type: String,
      enum: ['seen', 'not-seen'],
    },
  },
  {
    timestamps: true,
  }
);

type NotificationType = InferSchemaType<typeof NotificationSchema>;

const Notification = model<NotificationType>(
  'Notification',
  NotificationSchema
);

export { Notification, NotificationType };
