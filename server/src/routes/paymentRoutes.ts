import express from 'express';

import { validateToken } from '../middlewares/validateTokenHandler';
import { headleAddPayment } from '../controllers/payment';

const router = express.Router();

router.use(validateToken);

router.post('/add-new', headleAddPayment);

export default router;
