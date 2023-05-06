const express = require("express");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/orderControllers");

const router = express.Router();

// create order route

router.post("/add", verifyToken, createOrder);

// update order route

router.put("/:id", verifyTokenAndAdmin, updateOrder);

// delete order route

router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

// get user order route

router.get("/:userId", verifyTokenAndAdmin, getOrder);

//get all orders routes

router.get("/", verifyTokenAndAdmin, getAllOrders);

// get monthly income

router.get("/stats/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
