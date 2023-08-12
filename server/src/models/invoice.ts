import { Schema, InferSchemaType, model } from 'mongoose';
import OrganisationSchema from './organisation';
import ClientSchema from './client';

const InvoiceSchema = new Schema(
  {
    invoiceUrl: { type: String },
    organisation: {
      type: OrganisationSchema,
      required: true,
    },
    items: {
      type: [
        {
          item: String,
          quantity: Number,
          description: String,
        },
      ],
    },
    invoiceNumber: { type: String },
    client: {
      type: ClientSchema,
      required: true,
    },
    dueDate: { type: Number, required: true },
    totalAmount: { type: Number },
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

export default model<Invoice>('Income', InvoiceSchema);
