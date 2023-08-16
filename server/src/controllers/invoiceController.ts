import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const handleCreateInvoice = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req?.user);
    res.json({ message: 'success' });
  }
);
