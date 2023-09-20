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
    name: Joi.string().min(2).max(30).required().messages({
      'string.base': 'Name is required',
      'string.min': 'Name should be a minimum of two characters',
      'string.max': 'Name should be a maximum of thirty characters',
      'any.required': 'Name is required',
    }),
    email: Joi.string()
      .min(5)
      .max(60)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } })
      .messages({
        'string.base': 'Name is required',
        'string.min': 'Name should be a minimum of five characters',
        'string.max': 'Name should be a maximum of sixty characters',
        'any.required': 'Name is required',
      }),
    country: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Country is required',
      'string.min': 'Country should be a minimum of three characters',
      'string.max': 'Country should be a maximum of fifty characters',
      'any.required': 'Country is required',
    }),
    address: Joi.string().min(3).max(20).required().messages({
      'string.base': 'Address is required',
      'string.min': 'Address should be a minimum of three characters',
      'string.max': 'Address  should be a maximum of twenty characters',
      'any.required': 'Country is required',
    }),
    telephone: Joi.string().min(10).max(14).required().messages({
      'string.base': 'Telephone is required',
      'string.min': 'Address should be a minimum of ten characters',
      'string.max': 'Address  should be a maximum of fourteen characters',
      'any.required': 'Address is required',
    }),
    city: Joi.string().min(2).max(20).required().messages({
      'string.base': 'City is required',
      'string.min': 'Address should be a minimum of ten characters',
      'string.max': 'Address  should be a maximum of fourteen characters',
      'any.required': 'Address is required',
    }),
    postalCode: Joi.string().min(6).max(8).required().required().messages({
      'string.base': 'Postal code is required',
      'string.min': 'Postal code should be a minimum of six characters',
      'string.max': 'Postal code should  be a maximum of eight characters',
      'any.required': 'Postal code is required',
    }),
  });

  return schema.validate(client, { abortEarly: false });
}
