const Order = require("../models/Order");

// create cart

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

// update Cart

const updateOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete cart

const deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

//get user cart

const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get all users cart

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get monthly income

const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(date.getMonth() - 1, 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
};
