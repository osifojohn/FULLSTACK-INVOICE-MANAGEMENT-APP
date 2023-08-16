import { Schema, InferSchemaType, model } from 'mongoose';
import EachInvoice from './invoice';

const AllInvoiceSchema = new Schema(
  {
    invoice: [EachInvoice],
  },
  {
    timestamps: true,
  }
);

type Invoice = InferSchemaType<typeof AllInvoiceSchema>;

export default model<Invoice>('Invoice', AllInvoiceSchema);
