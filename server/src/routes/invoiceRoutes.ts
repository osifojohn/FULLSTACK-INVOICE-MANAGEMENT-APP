import express from 'express';

import {
  adminSignup,
  login,
  organisationRegister,
} from '../controllers/authController';

const router = express.Router();

router.post('/invoice', login);

export default router;
