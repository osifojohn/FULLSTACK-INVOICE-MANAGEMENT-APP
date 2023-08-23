import express from 'express';

import { handleCreateInvoice } from '../controllers/invoice/createInvoiceController';
import { handleDeleteInvoice } from '../controllers/invoice/deleteInvoiceController';
import { handleEditInvoice } from '../controllers/invoice/editInvoiceController';
import { validateToken } from '../middlewares/validateTokenHandler';
import {
  deleteOverdueInvoice,
  fetchOverdueInvoice,
} from '../controllers/invoice/overdueInvoiceController';

const router = express.Router();

router.use(validateToken);

router.post('/create', handleCreateInvoice);
router.put('/edit', handleEditInvoice);
router.delete('/delete', handleDeleteInvoice);
router.get('/overdue', fetchOverdueInvoice);
router.delete('/overdue', deleteOverdueInvoice);

export default router;
