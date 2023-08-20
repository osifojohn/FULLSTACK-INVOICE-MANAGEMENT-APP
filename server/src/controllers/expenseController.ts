import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
// import { startOfDay, endOfDay, format, parseISO } from 'date-fns';

import { PaginationOptions, STATUSCODE, expenseRequest } from '../types';
import Expense, { validateExpense } from '../models/expense';

// @desc add new Expense
// @route POST /Expense
// @access private
export const addExpense = asyncHandler(async (req: Request, res: Response) => {
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
});

//@desc Get all expenses
//@route GET /expense/all-expenses
//@access private
export const getAllExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 20 }: PaginationOptions = req.body;

    if (typeof page !== 'number' || typeof limit !== 'number') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid request');
    }

    const expenses = await Expense.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (!expenses || expenses.length === 0) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('No search result found');
    }

    const count = await Expense.count();

    res.status(STATUSCODE.SUCCESS).json({
      expenses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  }
);

//@desc Search expenses by name
//@route GET /expense/search
//@access private
export const searchExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      keyword,
      page = 1,
      limit = 20,
    }: { keyword: string } & PaginationOptions = req.body;

    if (!keyword || typeof keyword !== 'string') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid keyword');
    }

    if (typeof page !== 'number' || typeof limit !== 'number') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid  request');
    }

    const expenses = await Expense.find({
      name: { $regex: keyword, $options: 'i' },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Expense.count();

    if (!expenses || expenses.length === 0) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('No search result found');
    }

    res.status(STATUSCODE.SUCCESS).json({
      expenses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  }
);

//@desc Update expense
//@route PUT /expense/:id
//@access private
export const updateExpense = asyncHandler(
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
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error(error.details[0].message);
    }

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Expense not found');
    }

    const updatedClient = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(STATUSCODE.CREATED).json(updatedClient);
  }
);

//@route Delete /api/expenses/:id
//@access private
export const deleteExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('Expense not found');
    }
    const deletedExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
    });

    if (deletedExpense) {
      res.status(STATUSCODE.SUCCESS).json(deletedExpense);
    }
  }
);

//@desc get expenses byDateRange
//@route GET /expense/date-range
//@access private
export const fetchExpenseByDateRange = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      queryStartDate,
      queryEndDate,
    }: { queryStartDate: string; queryEndDate: string } = req.body;

    const THIRTY_DAYS = 30;

    const currentDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(currentDate.getDate() - THIRTY_DAYS);
    const defaultEndDate = currentDate;

    if (!queryStartDate || !queryEndDate) {
      const expenses = await Expense.find({
        updatedAt: {
          $gte: defaultStartDate,
          $lt: defaultEndDate,
        },
      });

      if (expenses && expenses?.length !== 0) {
        res.status(STATUSCODE.SUCCESS).json({ expenses });
      }
      if (expenses?.length === 0) {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('An error occured');
      }
    }

    const expenses = await Expense.find({
      updatedAt: {
        $gte: defaultStartDate,
        $lt: defaultStartDate,
      },
    });

    if (expenses && expenses.length !== 0) {
      res.status(STATUSCODE.SUCCESS).json({ expenses });
    }

    if (expenses.length === 0) {
      const expenses = await Expense.find({
        createdAt: {
          $gte: defaultStartDate,
          $lt: defaultEndDate,
        },
      });

      if (expenses && expenses?.length !== 0) {
        res.status(STATUSCODE.SUCCESS).json({ expenses });
      }
      if (expenses?.length === 0) {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('An error occured');
      }
    }
  }
);
