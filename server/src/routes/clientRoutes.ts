import express from 'express';

import {
  addClient,
  getClient,
  getClients,
  updateClient,
} from '../controllers/clientController';

const router = express.Router();

router.post('/new-client', addClient);
router.get('/all-clients', getClients);
router.route('/:id').put(updateClient).get(getClient);

export default router;
