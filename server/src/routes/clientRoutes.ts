import express from 'express';

import {
  addClient,
  getSingleClient,
  getAllClients,
  updateClient,
  searchClients,
} from '../controllers/clientController';

import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);

router.post('/new-client', addClient);
router.get('/all-clients', getAllClients);
router.route('/:id').put(updateClient).get(getSingleClient);
router.get('/search', searchClients);

export default router;
