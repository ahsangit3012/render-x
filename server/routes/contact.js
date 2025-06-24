const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
