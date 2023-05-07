const Cart = require("../models/Cart");
const mongoose = require("mongoose");
// create cart

const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get cart products

// update Cart

const updateCart = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(id, req.body);

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete cart

const deleteCart = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    res.status(200).json(deletedCart);
  } catch (error) {
    res.status(400).json(error);
  }
};

//get user cart

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

// get user cart products

const getCartProducts = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart.products);
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete cart product

const deleteCartProduct = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.params;
  try {
    const result = await Cart.updateOne(
      { userId },
      { $pull: { products: { _id: productId } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const clearCartProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { products: [] },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// get all users cart

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(400).json(error);
  }
};

// edit the quantity

const updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId, "products._id": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
  deleteCartProduct,
  getCartProducts,
  clearCartProducts,
  updateQuantity,
};
