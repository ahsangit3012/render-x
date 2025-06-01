import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total, paymentMethod } = location.state || {
    cart: [],
    total: 0,
    paymentMethod: "N/A",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-400">
          ✅ Order Successful!
        </h1>

        <p className="mb-2">
          <strong>Payment Method:</strong> {paymentMethod}
        </p>

        <h2 className="font-semibold mt-4 mb-2">Your Order:</h2>
        <ul className="list-disc list-inside space-y-1">
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - AED {item.price}
            </li>
          ))}
        </ul>

        <p className="text-lg font-semibold mt-4">
          Total Paid: AED {parseFloat(total).toFixed(2)}
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded w-full"
        >
          ⬅ Back to Shop
        </button>
      </div>
    </div>
  );
};

export default Success;
