import express from 'express';
import {
  deleteUserController,
  forgotPasswordController,
  getAllUsersController,
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

// get all users || GET METHOD
router.get('/all-users', getAllUsersController);

// delete user || GET METHOD
router.delete('/delete-user/:id', deleteUserController);

// testing purpose
router.get('/test', requireSignIn, isAdmin, testController);

export default router;
