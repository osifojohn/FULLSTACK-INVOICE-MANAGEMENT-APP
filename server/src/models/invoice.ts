import { Schema, InferSchemaType, model } from 'mongoose';
import mongoose from 'mongoose';

const InvoiceSchema = new Schema(
  {
    invoicePdf: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
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
          amountSum: Number,
        },
      ],
    },
    moreDetails: String,
    invoiceNumber: String,
    dueDate: { type: Date },
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

type InvoiceType = InferSchemaType<typeof InvoiceSchema>;

const Invoice = model<InvoiceType>('Invoice', InvoiceSchema);

export { InvoiceType, Invoice };
