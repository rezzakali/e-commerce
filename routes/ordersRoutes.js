import express from 'express';
import {
  getAllOrdersController,
  updateOrderStatusController,
  userOrderController,
} from '../controllers/userOrderController.js';

const router = express.Router();

// get user orders route
router.get('/user-order/:userId', userOrderController);

// get all orders
router.get('/all-orders', getAllOrdersController);

// update order status from dashboard
router.patch('/update-order-status/:id', updateOrderStatusController);

export default router;
