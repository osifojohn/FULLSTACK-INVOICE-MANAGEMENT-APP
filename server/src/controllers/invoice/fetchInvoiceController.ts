import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
// import { startOfDay, endOfDay, format, parseISO } from 'date-fns';

import { Invoice } from '../../models/invoice';
import { PaginationOptions, STATUSCODE } from '../../types';

//@desc Get all invoices
//@route GET /expense/all-invoices
//@access private
export const getAllInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10 }: PaginationOptions = req.body;

    const { orgId } = req.user;

    if (typeof page !== 'number' || typeof limit !== 'number') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid request');
    }

    const invoices = await Invoice.findById(orgId)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (!invoices || invoices?.length === 0) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('No search result found');
    }

    const count = await Invoice.count();

    res.status(STATUSCODE.SUCCESS).json({
      invoices,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  }
);

//@desc Search invoices by name
//@route GET /expense/search
//@access private
export const searchExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      keyword,
      page = 1,
      limit = 10,
    }: { keyword: string } & PaginationOptions = req.body;

    if (!keyword || typeof keyword !== 'string') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid keyword');
    }

    if (typeof page !== 'number' || typeof limit !== 'number') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid  request');
    }

    const invoices = await Invoice.find({
      name: { $regex: keyword, $options: 'i' },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Invoice.count();

    if (!invoices || invoices.length === 0) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('No search result found');
    }

    res.status(STATUSCODE.SUCCESS).json({
      invoices,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  }
);

//@desc Update expense
//@route PUT /expense/:id

//@desc get invoices byDateRange
//@route GET /expense/date-range
//@access private
export const fetchInvoiceByDateRange = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      queryStartDate,
      queryEndDate,
      page = 1,
      limit = 10,
    }: {
      queryStartDate: string;
      queryEndDate: string;
      page: number;
      limit: number;
    } = req.body;

    const THIRTY_DAYS = 30;

    const currentDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(currentDate.getDate() - THIRTY_DAYS);
    const defaultEndDate = currentDate;

    const count = await Invoice.count();

    if (!queryStartDate || !queryEndDate) {
      const invoices = await Invoice.find({
        updatedAt: {
          $gte: defaultStartDate,
          $lt: defaultEndDate,
        },
      });

      if (invoices && invoices?.length !== 0) {
        res.status(STATUSCODE.SUCCESS).json({
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          invoices,
        });
      }
      if (invoices?.length === 0) {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('An error occured');
      }
    }

    const invoices = await Invoice.find({
      updatedAt: {
        $gte: defaultStartDate,
        $lt: defaultStartDate,
      },
    });

    if (invoices && invoices.length !== 0) {
      res.status(STATUSCODE.SUCCESS).json({
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        invoices,
      });
    }

    if (invoices.length === 0) {
      const invoices = await Invoice.find({
        createdAt: {
          $gte: defaultStartDate,
          $lt: defaultEndDate,
        },
      });

      if (invoices && invoices?.length !== 0) {
        res.status(STATUSCODE.SUCCESS).json({
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          invoices,
        });
      }
      if (invoices?.length === 0) {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('An error occured');
      }
    }
  }
);
