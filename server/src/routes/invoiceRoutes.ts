import express from 'express';
import { handleCreateInvoice } from '../controllers/invoice/createInvoiceController';
import { validateToken } from '../middlewares/validateTokenHandler';
import { handleEditInvoice } from '../controllers/invoice/editInvoiceController';

const router = express.Router();

router.use(validateToken);

router.post('/create', handleCreateInvoice);
router.post('/edit', handleEditInvoice);

export default router;
