import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { InvoiceRequest, STATUSCODE, UserAuthHeader } from '../types';
import Client from '../models/client';
import Invoice from '../models/invoice';
import Organisation from '../models/organisation';

export const handleCreateInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId, items, dueDate, moreDetails }: InvoiceRequest = req.body;

    const { userId, orgId }: UserAuthHeader = req.user;

    if (!clientId || typeof clientId !== 'string' || clientId === '') {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Invalid request');
    }

    let invoiceNumber;
    let invoiceNumberInitial;
    let invoiceNumberIncrement;
    // let lastInvoiceNumberIncrement;

    const retrivedClient = await Client.findById(clientId).exec();
    const organisation = await Organisation.findById(orgId).exec();

    if (organisation && retrivedClient) {
      invoiceNumberInitial = organisation?.name.slice(0, 3)?.toUpperCase();

      if (organisation?.invoiceNumbers?.length === 0) {
        invoiceNumberIncrement = '0001';
        invoiceNumber = invoiceNumberInitial + invoiceNumberIncrement;
      }

      if (organisation?.invoiceNumbers?.length !== 0) {
        const retrievedInvoice = organisation.invoiceNumbers[-1];
        lastInvoiceNumberIncrement =
          +retrievedInvoice?.invoiceNumber?.slice(3) + 1;
      }
    }

    // getting sum per item and subTotal
    let subtotal = 0;
    items.forEach((item) => {
      item.amountSum = item.quantity * item.price;
      subtotal += item.amountSum;
    });

    res.json({ message: 'success' });
  }
);
