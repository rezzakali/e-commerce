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

// get all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).send({
      success: true,
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

// update order status from dashboard || PATCH METHOD
export const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusText } = req.body;
    const order = await orderModel.findOneAndUpdate(
      { _id: id },
      { delivery_status: statusText },
      { new: true }
    );
    res.status(200).send({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'There was a server side error!' || err?.message,
      error: err,
    });
  }
};
