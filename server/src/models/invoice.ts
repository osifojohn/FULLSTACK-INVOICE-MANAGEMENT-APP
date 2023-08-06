import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const InvoiceSchema = new Schema(
  {
    invoiceUrl: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSchema',
      required: true,
    },
    invoiceNumber: { type: String },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClientSchema',
      required: true,
    },
    dueDate: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: [
        {
          url: String,
          number: String,
          status: {
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
      ],
    },
  },
  {
    timestamps: true,
  }
);

type Invoice = InferSchemaType<typeof InvoiceSchema>;

export default model<Invoice>('Income', InvoiceSchema);
