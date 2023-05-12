import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    userId: { type: mongoose.ObjectId, required: true, ref: 'User' },
    products: [
      {
        productId: { type: mongoose.ObjectId },
        quantity: { type: Number, default: 1 },
        productName: { type: String, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String, required: true },
    orderStatus: { type: String, default: 'success' },
  },
  { timestamps: true }
);

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
