import express from 'express';
import { userOrderController } from '../controllers/userOrderController.js';

const router = express.Router();

// get user orders route
router.get('/user-order/:userId', userOrderController);

export default router;
