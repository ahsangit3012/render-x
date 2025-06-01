const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contact");

dotenv.config();
console.log("ENV CHECK:", process.env.STRIPE_SECRET_KEY);

// Initialize express app
const app = express();

// Import routes
const orderRoutes = require("./routes/orders");

const paymentRoutes = require("./routes/payments");

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY);
  console.log("Payment route mounted at /api/payments");
});
