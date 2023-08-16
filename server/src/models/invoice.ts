import { Schema, InferSchemaType, model } from 'mongoose';
import mongoose from 'mongoose';

const InvoiceSchema = new Schema(
  {
    invoiceUrl: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    items: {
      type: [
        {
          item: String,
          quantity: Number,
          description: String,
          price: Number,
        },
      ],
    },
    moreDetails: String,
    invoiceNumber: String,
    dueDate: { type: Date, required: true },
    totalPrice: Number,
    status: {
      type: String,
      enum: [
        'draft',
        'pending',
        'not-paid',
        'overdue',
        'partially-paid',
        'paid',
      ],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

type Invoice = InferSchemaType<typeof InvoiceSchema>;

export default model<Invoice>('Invoice', InvoiceSchema);
