import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { sendInvoiceRequest } from '../../types';
import { Client } from '../../models/client';

//@desc POST send invoice
//@route GET /message/send
//@access private
export const handleSendInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { mailSubject, message, clientId }: sendInvoiceRequest = req.body;
    const { orgId } = req.user;

    

    const clientEmail = await Client.findOne({ _id: clientId });
  }
);
