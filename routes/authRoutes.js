import express from 'express';
import { registerController } from '../controllers/authController.js';

// router
const router = express.Router();

router.post('/register', registerController);

export default router;
