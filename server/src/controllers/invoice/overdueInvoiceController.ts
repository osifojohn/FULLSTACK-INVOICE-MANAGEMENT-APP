import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { NOTIFICATIONTYPE, STATUSCODE, UserAuthHeader } from '../../types';
import { Notification } from '../../models/notification';

//@route fetch /invoice/overdue
//@access private
export const fetchOverdueInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { orgId }: UserAuthHeader = req.user;

    const notification = await Notification.find({
      orgId,
      type: NOTIFICATIONTYPE.INVOICE,
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
      type: NOTIFICATIONTYPE.INVOICE,
    });

    res.json(deletedInvoiceNofication);
  }
);
