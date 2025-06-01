import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51RUd79Rsx8wcTqfiztL12hlD4WJM2mtpUNSSuvuDg7U1nRbNcLj7bMbQLmJ4DhuY6ukpQWYhFzMXylqWbt8GHnAO00TyTsZHYw"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Router>
        <App />
      </Router>
    </Elements>
  </React.StrictMode>
);

reportWebVitals();
