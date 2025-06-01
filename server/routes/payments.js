const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");

router.post("/create-payment", async (req, res) => {
  console.log("✅ Payment route hit from frontend");
  const { total } = req.body;
  console.log("Received total:", total); // 👈 Logging input

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "aed",
    });

    console.log("✅ Stripe PaymentIntent created:", paymentIntent.id); // 👈 Stripe ID log

    const newPayment = new Payment({
      paymentIntentId: paymentIntent.id,
      status: "pending",
      amount: total,
    });

    await newPayment.save();
    console.log("✅ Payment saved to MongoDB"); // 👈 Confirm saved

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Stripe error:", err); // 👈 Error log
    res.status(500).send({ error: "Payment creation failed" });
  }
});

module.exports = router;
