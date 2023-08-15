import express from 'express';

import { addExpense } from '../controllers/expenseController';

const router = express.Router();

router.post('/add-new', addExpense);

export default router;
