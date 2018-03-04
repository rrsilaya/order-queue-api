import Order from './model';
import { getErrors } from '../utils';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      data: orders
    });
  } catch (err) {
    res.status(500).json({ errors: ['Internal server error while getting orders'] });
  }
};

export const addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    await newOrder.save();

    res.status(200).json({
      data: newOrder
    });
  } catch (err) {
    const errors = getErrors(err);
    res.status(500).json({ errors });
  }
}

export const updateOrder = async (req, res) => {
  try {
    const { _id } = req.params;

    await Order.findByIdAndUpdate(_id, req.body);
    const order = await Order.findById(_id);

    res.status(200).json({
      data: order
    });
  } catch (err) {
    const errors = getErrors(err);
    res.status(500).json({ errors });
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const order = Order.findById(req.params._id);

    await Order.findOneAndRemove({ _id });
    res.status(200).json({ data: order });
  } catch (err) {
    const errors = getErrors(err);
    res.status(500).json({ errors });
  }
}