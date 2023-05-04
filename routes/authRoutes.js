import express from 'express';
import {
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

router.get('/test', requireSignIn, isAdmin, testController);

// user auth route
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
