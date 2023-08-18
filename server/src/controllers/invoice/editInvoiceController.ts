import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

//@desc edit Invoice
//@route Edit /invoice/edit
//@access private
export const handleEditInvoice = asyncHandler(
  async (req: Request, res: Response) => {}
);
