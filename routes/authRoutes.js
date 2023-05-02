import express from 'express';
import {
  loginController,
  registerController,
} from '../controllers/authController.js';

// router
const router = express.Router();

// register || POST METHOD
router.post('/register', registerController);

// login || POST METHOD
router.post('/login', loginController);

export default router;
