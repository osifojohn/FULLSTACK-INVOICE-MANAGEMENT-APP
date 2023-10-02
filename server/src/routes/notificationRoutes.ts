import express from 'express';

import {
  deleteNotification,
  getAllNotification,
} from '../controllers/notificationController';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.use(validateToken);

router.get('/all-notifications', getAllNotification);
router.post('/notification-seen', deleteNotification);
router.post('/delete-notification', deleteNotification);

export default router;
