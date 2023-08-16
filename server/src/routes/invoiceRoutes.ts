import express from 'express';
import { handleCreateInvoice } from '../controllers/invoiceController';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);

router.post('/add-new', handleCreateInvoice);

export default router;
