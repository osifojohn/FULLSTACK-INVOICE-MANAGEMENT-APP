import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { format } from 'date-fns';

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

//@desc Search invoices by clientName
//@route GET /expense/search
//@access private
export const searchInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { keyword, page = 1, limit = 10 } = req.query;

    const { orgId } = req.user;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const invoices = await Invoice.find({
      orgId,
      clientName: { $regex: keyword, $options: 'i' },
    })
      .limit(limitNum * 1)
      .skip((pageNum - 1) * limitNum)
      .exec();

    const count = await Invoice.count();

    res.status(STATUSCODE.SUCCESS).json({
      invoices,
      totalPages: Math.ceil(count / limitNum),
      currentPage: page,
    });
  }
);

//@desc get invoices byDateRange
//@route POST /nnvoice/date-range
//@access private
export const getInvoiceByDateRange = asyncHandler(async (req, res) => {
  const {
    queryStartDate,
    page = 1,
    limit = 10,
  }: {
    queryStartDate?: string;
    page?: number;
    limit?: number;
  } = req.query;

  const { orgId } = req.user;

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
    invoices = await Invoice.find({
      orgId,
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
    orgId,
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

//@desc get invoices byChartDateRange
//@route POST /nnvoice/chart-date-range
//@access private
export const getInvoiceByDateRangeChart = asyncHandler(async (req, res) => {
  const {
    queryStartDate,
  }: {
    queryStartDate?: string;
  } = req.query;

  const { orgId } = req.user;

  let invoices;

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
    invoices = await Invoice.find({
      orgId,
      createdAt: {
        $gte: defaultEndDate,
        $lt: defaultStartDate,
      },
    }).exec();

    res.status(STATUSCODE.SUCCESS).json({
      invoices,
    });
  }

  invoices = await Invoice.find({
    orgId,
    createdAt: {
      $gte: queryStartDate,
      $lt: queryEndDate,
    },
  }).exec();

  res.status(STATUSCODE.SUCCESS).json({
    invoices,
  });
});
