import { Schema, InferSchemaType, model } from 'mongoose';
import OrganisationSchema from './organisation';
import ClientSchema from './client';

const EachInvoiceSchema = new Schema(
  {
    invoiceUrl: String,
    organisation: OrganisationSchema,
    items: {
      type: [
        {
          item: String,
          quantity: Number,
          description: String,
        },
      ],
    },
    invoiceNumber: String,
    client: ClientSchema,
    dueDate: { type: Number, required: true },
    totalAmount: Number,
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

type EachInvoice = InferSchemaType<typeof EachInvoiceSchema>;

export default model<EachInvoice>('EachInvoice', EachInvoiceSchema);
