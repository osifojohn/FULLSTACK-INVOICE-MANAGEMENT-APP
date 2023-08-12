import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const ExpenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    receipt: { type: String },
  },
  {
    timestamps: true,
  }
);

type Expense = InferSchemaType<typeof ExpenseSchema>;

export default model<Expense>('Expense', ExpenseSchema);
