import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const PaymentSchema = new Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
    linkedTo: String,
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

type PaymentType = InferSchemaType<typeof PaymentSchema>;

const Payment = model<PaymentType>('Payment', PaymentSchema);

export { Payment, PaymentType };
