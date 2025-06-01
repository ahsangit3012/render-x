import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const games = [
  { id: 1, name: "Call of Duty", price: 220, image: "callofduty.jpg" },
  { id: 2, name: "FIFA 24", price: 185, image: "fifa24.jpg" },
  { id: 3, name: "Elden Ring", price: 255, image: "eldenring.jpg" },
  { id: 4, name: "GTA V", price: 145, image: "gtav.png" },
  {
    id: 5,
    name: "Valorant Points Pack",
    price: 73,
    image: "Valorant.jpg",
  },
  {
    id: 6,
    name: "Red Dead Redemption 2",
    price: 240,
    image: "reddead.jpg",
  },
  {
    id: 7,
    name: "Assassin's Creed Mirage",
    price: 220,
    image: "AAM.jpg",
  },
  {
    id: 8,
    name: "Spider-Man: Miles Morales",
    price: 205,
    image: "milesmorales.jpg",
  },
];

const accessories = [
  {
    id: 9,
    name: "Logitech G Pro X Headset",
    price: 330,
    image: "hyperx1.png",
  },
  {
    id: 10,
    name: "Razer DeathAdder Mouse",
    price: 180,
    image: "razerDAA.png",
  },
  {
    id: 11,
    name: "SteelSeries Apex Pro Keyboard",
    price: 660,
    image: "apex-pro-full.png",
  },
  {
    id: 12,
    name: "Corsair MM300 Mousepad",
    price: 110,
    image: "corsair.png",
  },
  {
    id: 13,
    name: "HyperX Cloud Alpha",
    price: 367,
    image: "hyperx.jpg",
  },
  {
    id: 14,
    name: "Elgato Stream Deck Mini",
    price: 330,
    image: "streamdeck.jpg",
  },
  {
    id: 15,
    name: "Gaming Chair - Secretlab",
    price: 1465,
    image: "secretlab.jpg",
  },
  {
    id: 16,
    name: "RGB LED Strip Lights",
    price: 73,
    image: "rgbstrip.jpg",
  },
];

const gear = [
  { id: 17, name: "RTX 4080 GPU", price: 4400, image: "rtx4080.png" },
  { id: 18, name: "PS5 Console", price: 1835, image: "ps5.jpg" },
  {
    id: 19,
    name: "Custom PC Build",
    price: 5150,
    image: "Xander-Neptune-Pro-ATX-Gaming-Case.webp",
  },
  { id: 20, name: "Xbox Series X", price: 1650, image: "xbox1.jpg" },
  {
    id: 21,
    name: "Alienware 27” Monitor",
    price: 2200,
    image: "alienware.jpg",
  },
  {
    id: 22,
    name: "Intel i9 Processor",
    price: 1835,
    image: "corei9.webp",
  },
  {
    id: 23,
    name: "ASUS ROG Motherboard",
    price: 1100,
    image: "motherboard.webp",
  },
  {
    id: 24,
    name: "Samsung SSD 2TB",
    price: 845,
    image: "ssd.webp",
  },
];

const Shop = () => {
  const [activeTab, setActiveTab] = useState("games");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const getProducts = () => {
    if (activeTab === "games") return games;
    if (activeTab === "accessories") return accessories;
    return gear;
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowCart(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="pt-20 px-6 pb-10 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center flex-wrap mt-5 mb-8">
        <div className="w-full sm:w-auto flex justify-center flex-1 gap-4">
          <button
            onClick={() => setActiveTab("games")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "games" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-700`}
          >
            🎮 Games
          </button>
          <button
            onClick={() => setActiveTab("accessories")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "accessories" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-700`}
          >
            🎧 Accessories
          </button>
          <button
            onClick={() => setActiveTab("gear")}
            className={`px-4 py-2 rounded-full ${
              activeTab === "gear" ? "bg-blue-600" : "bg-gray-700"
            } hover:bg-blue-700`}
          >
            🖥️ Gear
          </button>
        </div>

        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowCart(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full"
          >
            🛒 Cart ({cart.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {getProducts().map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg p-3 shadow hover:shadow-md transition w-full"
          >
            <div className="w-full aspect-square mb-3 rounded overflow-hidden bg-gray-700 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>{" "}
            <h2 className="text-base font-semibold leading-tight">
              {product.name}
            </h2>
            <p className="text-sm text-green-400 mb-2">AED {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-sm rounded font-semibold text-black"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 text-white shadow-lg p-6 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-gray-300 hover:text-white text-sm"
            >
              ⬅ Back
            </button>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="mb-2 flex justify-between items-center"
                >
                  <span>
                    {item.name} - AED {item.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-400 hover:text-red-600 text-sm ml-2"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}

          <hr className="my-4 border-gray-600" />
          <p className="text-xl font-semibold">Total: AED {total}</p>
          <button
            onClick={() => {
              navigate("/checkout", { state: { cart, total } });
            }}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
