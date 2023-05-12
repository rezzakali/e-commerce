import orderModel from '../models/orderModel.js';

// user order controller
export const userOrderController = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId });
    // console.log(orders);
    res.status(200).send({
      success: true,
      message: 'Fetched successfully!',
      orders,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};
