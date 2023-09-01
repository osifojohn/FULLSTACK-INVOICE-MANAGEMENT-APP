import mongoose, { Schema, InferSchemaType, model } from 'mongoose';
import Joi from 'joi';

import { IClient } from '../types';

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    invoice: {
      type: [String],
      default: undefined,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

type ClientType = InferSchemaType<typeof ClientSchema>;

const Client = model<ClientType>('Client', ClientSchema);

export { Client, ClientType };

export function validateClient(client: IClient) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } }),
    country: Joi.string().min(5).max(25).required(),
    address: Joi.string().min(5).max(25).required(),
    telephone: Joi.string().min(10).max(14).required(),
    city: Joi.string().min(2).max(60).required(),
    postalCode: Joi.string().min(2).max(12).required(),
  });

  return schema.validate(client, { abortEarly: false });
}
