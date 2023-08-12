import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IOrganisation } from '../types';

export const handleCreateInvoice = asyncHandler(
  async (req: Request, res: Response) => {}
);
