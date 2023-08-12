import express from 'express';

import {
  adminSignup,
  login,
  organisationRegister,
} from '../controllers/authController';

const router = express.Router();

router.post('/organisation', organisationRegister);
router.post('/admin', adminSignup);
router.post('/login', login);

export default router;
