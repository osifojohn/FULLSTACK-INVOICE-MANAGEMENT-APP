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
      ref: 'organisationSchema',
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'worker'],
    },
    active: { type: String, default: 'worker' },
  },
  {
    timestamps: true,
  }
);

type User = InferSchemaType<typeof UserSchema>;
export default model<User>('User', UserSchema);

export function validateUser(user: IUserRequestAdmin) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } }),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(10).max(14).required(),
    organisation: Joi.string().min(5).max(30).required(),
  });

  return schema.validate(user, { abortEarly: false });
}
