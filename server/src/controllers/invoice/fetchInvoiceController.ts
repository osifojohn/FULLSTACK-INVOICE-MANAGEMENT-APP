import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { format } from 'date-fns';
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
export const searchInvoice = asyncHandler(
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

//@desc get invoices byDateRange
//@route POST /nnvoice/date-range
//@access private
export const fetchInvoiceByDateRange = asyncHandler(async (req, res) => {
  const {
    queryStartDate,
    page = 1,
    limit = 10,
  }: {
    queryStartDate?: string;
    page?: number;
    limit?: number;
  } = req.query;

  let invoices;
  let count;

  const THIRTY_DAYS = 30;
  const defaultStartDate = format(new Date(), 'yyyy-MM-dd');
  const initialDate = new Date(queryStartDate as string);

  const queryEndDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 1,
    0
  );

  if (queryStartDate === 'undefined') {
    const defaultEndDate = format(
      new Date().setDate(new Date().getDate() - THIRTY_DAYS),
      'yyyy-MM-dd'
    );

    console.log(defaultEndDate, defaultStartDate);

    invoices = await Invoice.find({
      createdAt: {
        $gte: defaultEndDate,
        $lt: defaultStartDate,
      },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    count = await Invoice.count();

    res.status(STATUSCODE.SUCCESS).json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      invoices,
    });
  }

  invoices = await Invoice.find({
    createdAt: {
      $gte: queryStartDate,
      $lt: queryEndDate,
    },
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  count = await Invoice.count();

  res.status(STATUSCODE.SUCCESS).json({
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    invoices,
  });
});
