import express from 'express';

import { handleSendInvoice } from '../controllers/invoice/handleSendInvoice';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);

router.post('/send', handleSendInvoice);

export default router;
