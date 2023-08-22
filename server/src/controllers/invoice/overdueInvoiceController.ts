import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { Notification } from '../../models/notification';
import { STATUSCODE, UserAuthHeader } from '../../types';

//@route fetch /invoice/overdue
//@access private
export const fetchOverdueInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { orgId }: UserAuthHeader = req.user;

    const notification = await Notification.find({
      orgId,
      type: 'invoice',
    });

    if (!notification) {
      res.status(STATUSCODE.NOT_FOUND);
      throw new Error('No recent notification');
    }

    res.json(notification);
  }
);

//@route fetch /invoice/delete
//@access private
export const deleteOverdueInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { type, invoiceId } = req.body;

    if (!type) {
      res.status(STATUSCODE.BAD_REQUEST);
      throw new Error('Provide invoice Id');
    }

    const deletedInvoiceNofication = await Notification.findOneAndDelete({
      _id: invoiceId,
      type: 'invoice',
    });

    res.json(deletedInvoiceNofication);
  }
);
