const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const order = new Order({ items, total });
    await order.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error("Order saving error:", error); 
    res.status(500).json({ message: "Failed to save order" });
  }
});

module.exports = router;
