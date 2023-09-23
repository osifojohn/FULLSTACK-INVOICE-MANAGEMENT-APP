import { Schema, InferSchemaType, model } from 'mongoose';
import mongoose from 'mongoose';

import { INVOICESTATUS } from '../types';

const InvoiceSchema = new Schema(
  {
    clientName: String,
    clientEmail: String,
    clientTelephone: String,
    clientAddress: String,
    clientCountry: String,
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
        INVOICESTATUS.DRAFT,
        INVOICESTATUS.PENDING,
        INVOICESTATUS.OVERDUE,
        INVOICESTATUS.PARTIALLY_PAID,
        INVOICESTATUS.PAID,
      ],
      default: INVOICESTATUS.DRAFT,
    },
  },
  {
    timestamps: true,
  }
);

type InvoiceType = InferSchemaType<typeof InvoiceSchema>;

const Invoice = model<InvoiceType>('Invoice', InvoiceSchema);

export { InvoiceType, Invoice };
