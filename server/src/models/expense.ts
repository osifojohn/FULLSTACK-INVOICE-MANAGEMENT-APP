import mongoose, { Schema, InferSchemaType, model } from 'mongoose';

const ExpenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSchema',
      required: true,
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amountPaid: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

type Expense = InferSchemaType<typeof ExpenseSchema>;

export default model<Expense>('Expense', ExpenseSchema);
