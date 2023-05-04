import express from 'express';
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router
const router = express.Router();

// register || POST METHOD
router.post('/register', registerController);

// login || POST METHOD
router.post('/login', loginController);

// forgot password || POST METHOD
router.post('/forgot-password', forgotPasswordController);

// testing purpose
router.get('/test', requireSignIn, isAdmin, testController);

export default router;
