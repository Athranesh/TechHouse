import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const saveOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    const user = await User.findById(req.user._id);

    user.orders.push(createdOrder);

    const savedOrder = await user.save();

    res.status(201).json(createdOrder);
  }
});

export const getOrderById = asyncHandler(async (req, res) => {
  //populate populates the object with items specified and space-separated in the second argument from the ref. In the case below, it fetches related name and email from 'user', _id of which is referenced in the order.
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  //Checking if the correct user is receiving the order
  if (order) {
    if (order.user._id.equals(req.user._id)) {
      res.json(order);
    } else {
      res.status(401);
      throw new Error('You do not have permission to view this order');
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
