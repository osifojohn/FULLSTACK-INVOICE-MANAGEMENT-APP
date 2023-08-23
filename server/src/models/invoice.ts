import { Schema, InferSchemaType, model } from 'mongoose';
import mongoose from 'mongoose';

const InvoiceSchema = new Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
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
    invoicePdf: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
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
    paidToDate: {
      type: Number,
      required: true,
    },
    dueDate: { type: Date, required: true },
    totalPrice: Number,
    status: {
      type: String,
      enum: [
        'Draft',
        'Pending',
        'Not-paid',
        'Overdue',
        'Partially-paid',
        'Paid',
      ],
      default: 'Draft',
    },
  },
  {
    timestamps: true,
  }
);

type InvoiceType = InferSchemaType<typeof InvoiceSchema>;

const Invoice = model<InvoiceType>('Invoice', InvoiceSchema);

export { InvoiceType, Invoice };
