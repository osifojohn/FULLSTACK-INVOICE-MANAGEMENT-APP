import express from 'express';
import {
  login,
  organisationRegister,
  signup,
} from '../controllers/authController';

const router = express.Router();

router.post('/organisation', organisationRegister);
router.post('/admin', signup);
router.post('/login', login);

export default router;
