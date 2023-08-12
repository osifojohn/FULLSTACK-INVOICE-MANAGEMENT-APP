import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const IncomeSchema = new Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true,
    },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

type Income = InferSchemaType<typeof IncomeSchema>;

export default model<Income>('Income', IncomeSchema);
