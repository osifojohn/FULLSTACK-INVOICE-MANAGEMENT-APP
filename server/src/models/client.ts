import { Schema, InferSchemaType, model } from 'mongoose';
import { IClient } from '../types';
import Joi from 'joi';

const ClientSchema = new Schema(
  {
    companyName: { type: String },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type Client = InferSchemaType<typeof ClientSchema>;

export default model<Client>('Client', ClientSchema);

export function validateClient(client: IClient) {
  const schema = Joi.object({
    companyName: Joi.string().min(2).max(60).required(),
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
