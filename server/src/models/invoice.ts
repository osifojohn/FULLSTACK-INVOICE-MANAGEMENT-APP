import { Schema, InferSchemaType, model } from 'mongoose';
import OrganisationSchema from './organisation';
import ClientSchema from './client';

const InvoiceSchema = new Schema(
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

type Invoice = InferSchemaType<typeof InvoiceSchema>;

export default model<Invoice>('Income', InvoiceSchema);
