import express from 'express';

import {
  addExpense,
  deleteExpense,
  fetchExpenseByDateRange,
  getAllExpense,
  searchExpense,
  updateExpense,
} from '../controllers/expenseController';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);

router.post('/add-new', addExpense);
router.route('/:id').put(updateExpense).delete(deleteExpense);
router.get('/search', searchExpense);
router.get('/all-expense', getAllExpense);
router.get('/date-range', fetchExpenseByDateRange);

export default router;
