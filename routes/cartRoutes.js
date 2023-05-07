const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
  deleteCartProduct,
  getCartProducts,
  clearCartProducts,
} = require("../controllers/cartControllers");

const router = express.Router();

// create cart route

router.post("/", createCart);

// update cart route

router.put("/:id", updateCart);

// delete cart route

router.delete("/:id", verifyTokenAndAdmin, deleteCart);

// get user cart route

router.get("/:userId", getCart);

// get user cart products
router.get("/products/:userId", getCartProducts);

// delete cart product

router.delete("/:userId/:productId", deleteCartProduct);

// clear cart products

router.put("/products/clear/:userId", clearCartProducts);

//get all carts routes

router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
