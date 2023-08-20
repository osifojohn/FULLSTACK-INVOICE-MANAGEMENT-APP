import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

import { cloudinaryDeleteFn } from '../../utils/cloudinaryAndDbFns';
import { STATUSCODE, UserAuthHeader } from '../../types';
import { Invoice } from '../../models/invoice';

//@route Delete /invoice/delete
//@access private
export const handleDeleteInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    const { orgId }: UserAuthHeader = req.user;

    const result = await Invoice.findOneAndDelete({ orgId })
      .sort({
        updatedAt: -1,
      })
      .then((result) => result)
      .catch(() => {
        res.status(STATUSCODE.SERVER_ERROR);
        throw new Error('Error in deleting invoice');
      });

    if (result) {
      cloudinaryDeleteFn(res, result);
    }
    res.json(result);
  }
);
