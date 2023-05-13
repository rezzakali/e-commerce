import express from 'express';
import formidable from 'express-formidable';
import {
  deleteUserController,
  forgotPasswordController,
  getAllUsersController,
  getUserProfileImageController,
  loginController,
  registerController,
  testController,
  updateUserInformationController,
  updateUserProfilePictureController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router
const router = express.Router();

// register || POST METHOD
router.post('/register', formidable(), registerController);

// login || POST METHOD
router.post('/login', loginController);

// forgot password || POST METHOD
router.post('/forgot-password', forgotPasswordController);

// get all users || GET METHOD
router.get('/all-users', getAllUsersController);

// delete user || GET METHOD
router.delete('/delete-user/:id', deleteUserController);

// get user image
router.get('/get-user-profile-image/:id', getUserProfileImageController);

// udpate user information by user
router.patch('/update-user-information/:id', updateUserInformationController);

// update user profile picture
router.patch(
  '/update-user-profile-picture/:id',
  formidable(),
  updateUserProfilePictureController
);

// testing purpose
router.get('/test', requireSignIn, isAdmin, testController);

export default router;
