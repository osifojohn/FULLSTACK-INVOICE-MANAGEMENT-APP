import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { STATUSCODE, expenseRequest } from '../types';
import Expense, { validateExpense } from '../models/expense';

// @desc add new Expense
// @route POST /Expense
// @access private
export const addExpense = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const {
      orgId,
      userId,
      name,
      category,
      description,
      amount,
      receipt,
    }: expenseRequest = req.body;

    const { error } = validateExpense({
      orgId,
      userId,
      name,
      category,
      description,
      amount,
      receipt,
    });

    if (error) {
      const [errorMessage] = error.details.map((detail) => detail.message);
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error(errorMessage);
    }

    const newExpense = await Expense.create({
      orgId,
      userId,
      name,
      category,
      description,
      amount,
      receipt,
    });

    if (newExpense) {
      res.status(STATUSCODE.CREATED).json({
        message: `'${name}' added to expense list`,
        id: newExpense?._id.toString(),
      });
    }
  }
);
