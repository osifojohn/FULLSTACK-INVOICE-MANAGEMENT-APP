import mongoose, { Schema, InferSchemaType, model } from 'mongoose';
import Joi from 'joi';

import { paymentRequest } from '../types';

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
    linkedTo: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

type PaymentType = InferSchemaType<typeof PaymentSchema>;

const Payment = model<PaymentType>('Payment', PaymentSchema);

export { Payment, PaymentType };

export function validatePayment(expense: paymentRequest) {
  const schema = Joi.object({
    linkedTo: Joi.string().min(24).max(24).required().messages({
      'string.base': 'Link should be a string',
      'string.min': 'LinkId is not valid',
      'string.max': 'LinkId is not valid',
      'any.required': 'Link is required',
    }),
    amount: Joi.number().required().messages({
      'string.amount': 'Enter a valid amount!',
      'any.required': 'Amount is required',
    }),
  });

  return schema.validate(expense, { abortEarly: false });
}
