import express from 'express';

import { handleCreateInvoice } from '../controllers/invoice/createInvoiceController';
import { handleEditInvoice } from '../controllers/invoice/editInvoiceController';
import { validateToken } from '../middlewares/validateTokenHandler';
import {
  getInvoiceByDateRange,
  getInvoiceByDateRangeChart,
  searchInvoice,
} from '../controllers/invoice/fetchInvoiceController';

const router = express.Router();

router.use(validateToken);

router.post('/create', handleCreateInvoice);
router.put('/edit', handleEditInvoice);
router.get('/date-range', getInvoiceByDateRange);
router.get('/chart-date-range', getInvoiceByDateRangeChart);
router.get('/search', searchInvoice);

export default router;
