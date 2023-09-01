import mongoose, { Schema, InferSchemaType, model } from 'mongoose';
import Joi from 'joi';

import { IUserRequestAdmin } from '../types';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organisation',
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'worker'],
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

type UserType = InferSchemaType<typeof UserSchema>;
const User = model<UserType>('User', UserSchema);
export { UserType, User };

export function validateUser(user: IUserRequestAdmin) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().messages({
      'string.base': 'FirstName should be a string',
      'string.min': 'FirstName must be a minimum 2 characters long.',
      'string.max': 'FirstName cannot exceed 30 characters long.',
      'any.required': 'FirstName is required',
    }),
    lastName: Joi.string().min(2).max(30).required().messages({
      'string.base': 'LastName should be a string',
      'string.min': 'LastName must be a minimum 2 characters long.',
      'string.max': 'LastName cannot exceed 30 characters long.',
      'any.required': 'LastName is required',
    }),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } })
      .messages({
        'string.base': 'Email should be a string',
        'string.min': 'Email  must be a minimum 6 characters long.',
        'string.max': 'Email cannot exceed 255 characters long.',
        'any.required': 'Email is required',
      }),
    password: Joi.string().min(7).max(30).required().messages({
      'string.base': 'Password should be a string',
      'string.min': 'Password  must be a minimum 7 characters long.',
      'string.max': 'Password cannot exceed 30 characters long.',
      'any.required': 'Password is required',
    }),
    phone: Joi.string().min(10).max(14).required(),
  });

  return schema.validate(user, { abortEarly: false });
}
