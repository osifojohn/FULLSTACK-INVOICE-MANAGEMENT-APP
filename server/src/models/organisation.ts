import { Schema, InferSchemaType, model } from 'mongoose';
import Joi from 'joi';

import { IOrganisation } from '../types';

const OrganisationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    logoUrl: { type: String },
    phone: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type OrganisationType = InferSchemaType<typeof OrganisationSchema>;

const Organisation = model<OrganisationType>(
  'Organisation',
  OrganisationSchema
);

export { Organisation, OrganisationType };

export function validateOrganisation(org: IOrganisation) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name  must be a minimum 2 characters long.',
      'string.max': 'Name  cannot exceed 30 characters long.',
      'any.required': 'Name  is required',
    }),
    logoUrl: Joi.string().min(2),
    orgEmail: Joi.string().min(5).max(50).email().required().messages({
      'string.base': 'Company email should be a string',
      'string.min': 'Company email must be a minimum 5 characters long.',
      'string.max': 'Company email cannot exceed 50 characters long.',
      'any.required': 'Company email  is required',
    }),
    orgPhone: Joi.string().min(10).max(14).required().messages({
      'string.base': 'Company phone number should be a string',
      'string.min':
        'Company phone number must be a minimum 10 characters long.',
      'string.max':
        'Company phone number must be a minimum 14 characters long.',
      'any.required': 'Company phone number  is required',
    }),
    address: Joi.string().min(4).max(30).required().messages({
      'string.base': 'Address should be a string',
      'string.min': 'Address must be a minimum 4 characters long.',
      'string.max': 'Address must be a minimum 30 characters long..',
      'any.required': 'Address  is required',
    }),
    city: Joi.string().min(3).max(50).required().messages({
      'string.base': 'City should be a string',
      'string.min': 'City must be a minimum 3 characters long.',
      'string.max': 'City must be a minimum 50 characters long..',
      'any.required': 'City  is required',
    }),
    country: Joi.string().min(2).max(40).required().messages({
      'string.base': 'Country should be a string',
      'string.min': 'Country must be a minimum 2 characters long.',
      'string.max': 'Country must be a minimum 40 characters long..',
      'any.required': 'Country  is required',
    }),
  });

  return schema.validate(org, { abortEarly: false });
}
