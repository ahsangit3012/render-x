import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RUd79Rsx8wcTqfiztL12hlD4WJM2mtpUNSSuvuDg7U1nRbNcLj7bMbQLmJ4DhuY6ukpQWYhFzMXylqWbt8GHnAO00TyTsZHYw"
);

const CheckoutForm = ({ cart, total, paymentMethod, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create PaymentIntent
    const paymentRes = await fetch(
      "http://localhost:5000/api/payments/create-payment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total }),
      }
    );

    const paymentData = await paymentRes.json();
    if (!paymentData.clientSecret) return alert("Stripe init failed");

    // 2. Confirm card payment
    const result = await stripe.confirmCardPayment(paymentData.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      // 3. Save Order
      const orderRes = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(({ name, price }) => ({ name, price })),
          total: Number(total),
        }),
      });

      if (orderRes.ok) {
        navigate("/success", { state: { cart, total, paymentMethod } });
      } else {
        alert("Order save failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="bg-white p-4 rounded" />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 py-2 rounded font-semibold text-white"
        disabled={!stripe || !elements}
      >
        Pay with Card
      </button>
    </form>
  );
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (location.state?.cart && location.state?.total) {
      setCart(location.state.cart);
      setTotal(location.state.total);
    }
  }, [location.state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/shop")}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 mb-4 font-semibold shadow"
        >
          ⬅ Back to Shop
        </button>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

          <p className="mb-4">Total: AED {total}</p>

          {paymentMethod === "card" && (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                cart={cart}
                total={total}
                paymentMethod={paymentMethod}
                navigate={navigate}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
