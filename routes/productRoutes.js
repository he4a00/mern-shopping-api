const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/productControllers");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = express.Router();

// create  product

router.post("/", verifyTokenAndAdmin, addProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);

module.exports = router;
