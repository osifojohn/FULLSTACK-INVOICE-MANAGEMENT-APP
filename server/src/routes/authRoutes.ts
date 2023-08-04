import express from 'express';
import {
  adminSignup,
  organisationRegister,
} from '../controllers/authController';

const router = express.Router();

router.post('/organisation', organisationRegister);
router.post('/admin', adminSignup);

export default router;
