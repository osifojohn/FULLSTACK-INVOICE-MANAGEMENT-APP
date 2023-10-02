import { Request, Response } from 'express';

import { Payment, validatePayment } from '../models/payment';
import { Invoice } from '../models/invoice';
import { ClientSession } from 'mongoose';
import {
  INVOICESTATUS,
  STATUSCODE,
  UserAuthHeader,
  paymentRequest,
} from '../types';

// @desc add new Payment
// @route POST /payment/add-new
// @access private
export const headleAddPayment = async (req: Request, res: Response) => {
  await Payment.createCollection();
  const session: ClientSession = await Invoice.startSession();

  try {
    const { amount, linkedTo }: paymentRequest = req.body;

    const { orgId }: UserAuthHeader = req.user;

    const { error } = validatePayment({
      amount,
      linkedTo,
    });

    if (error) {
      const [errorMessage] = error.details.map((detail) => detail.message);
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error(errorMessage);
    }

    const invoice = await Invoice.findById(linkedTo).exec();
    const prevPaidToDate = invoice?.paidToDate as number;
    const totalAmount = invoice?.totalPrice as number;
    const newPaidToDate = prevPaidToDate + amount;
    let newInvoiceStatus: string;

    if (prevPaidToDate + amount >= totalAmount) {
      newInvoiceStatus = INVOICESTATUS.PAID;
    } else {
      newInvoiceStatus = INVOICESTATUS.PARTIALLY_PAID;
    }

    await session.withTransaction(async () => {
      await Invoice.findByIdAndUpdate(
        linkedTo,
        {
          $set: {
            status: newInvoiceStatus,
            paidToDate: newPaidToDate,
          },
        },
        { new: true }
      )
        .session(session)
        .exec();

      await Payment.create(
        [
          {
            orgId,
            amount,
            clientId: invoice?.clientId.toString(),
            linkedTo: invoice?._id,
            invoiceNumber: invoice?.invoiceNumber,
            clientName: invoice?.clientName,
            clientEmail: invoice?.clientEmail,
            clientTelephone: invoice?.clientTelephone,
            clientAddress: invoice?.clientAddress,
            clientCountry: invoice?.clientCountry,
          },
        ],
        { session: session }
      );
    });

    await session.commitTransaction();

    res.status(STATUSCODE.CREATED).json({
      message: 'Payment successfully added',
      status: STATUSCODE.CREATED,
    });
  } catch (error) {
    res.status(STATUSCODE.SERVER_ERROR).json({
      message: 'Please try again, an error occured',
      status: STATUSCODE.SERVER_ERROR,
    });
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};
