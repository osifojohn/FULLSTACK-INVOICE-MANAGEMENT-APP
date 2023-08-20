import express from 'express';

import { handleCreateInvoice } from '../controllers/invoice/createInvoiceController';
import { handleDeleteInvoice } from '../controllers/invoice/deleteInvoiceController';
import { handleEditInvoice } from '../controllers/invoice/editInvoiceController';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);

router.post('/create', handleCreateInvoice);
router.put('/edit', handleEditInvoice);
router.delete('/delete', handleDeleteInvoice);

export default router;
