import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const IncomeSchema = new Schema(
  {
    invoiceUrl: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClientSchema',
      required: true,
    },
    amountPaid: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

type Income = InferSchemaType<typeof IncomeSchema>;

export default model<Income>('Income', IncomeSchema);
