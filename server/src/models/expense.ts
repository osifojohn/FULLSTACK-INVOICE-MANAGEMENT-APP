import Joi from 'joi';
import mongoose, { Schema, InferSchemaType, model } from 'mongoose';
import { expenseRequest } from '../types';

const ExpenseSchema = new Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: { type: Number, required: true },
    receipt: { type: String, default: undefined },
  },
  {
    timestamps: true,
  }
);

type Expense = InferSchemaType<typeof ExpenseSchema>;

export default model<Expense>('Expense', ExpenseSchema);

export function validateExpense(expense: expenseRequest) {
  const schema = Joi.object({
    orgId: Joi.string().required().messages({
      'string.orgId': 'Please pass  orgId Id along alongside with the header',
      'any.required': 'Org Id is required',
    }),
    userId: Joi.string().required().messages({
      'string.userId': 'Please pass user Id along alongside with the header',
      'any.required': 'User Id is required',
    }),
    name: Joi.string().min(3).max(30).required().messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name must be a minimum 4 characters long.',
      'string.max': 'Name cannot exceed 30 characters long.',
      'any.required': 'Name is required',
    }),
    category: Joi.string().min(4).max(20).required().messages({
      'string.base': 'Category should be a string',
      'string.min': 'Category must be a minimum 4 characters long.',
      'string.max': 'Category cannot exceed  20 characters long.',
      'any.required': 'Category is required',
    }),
    description: Joi.string().min(4).max(250).messages({
      'string.base': 'Category should be a string',
      'string.min': 'Category must be a minimum 4 characters long.',
      'string.max': 'Category cannot exceed 250 characters long.',
      'any.required': 'Category is required',
    }),
    amount: Joi.number().required().messages({
      'string.amount': 'Please enter a valid expense amount!',
      'any.required': 'Amount is required',
    }),
    receipt: Joi.string(),
  });

  return schema.validate(expense, { abortEarly: false });
}
