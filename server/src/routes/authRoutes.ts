import express from 'express';

import { adminSignup, login } from '../controllers/authController';

const router = express.Router();

router.post('/admin', adminSignup);
router.post('/login', login);

export default router;
