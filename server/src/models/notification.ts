import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

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
    linkedTo: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['invoice'],
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
