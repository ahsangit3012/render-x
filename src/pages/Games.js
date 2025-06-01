// src/pages/Games.js
import React from "react";
import { Link } from "react-router-dom"; // ✅ Step 1

const games = [
  {
    title: "Valorant",
    image: "/Valorant.jpg",
    platform: "PC / Console (via Xbox Game Pass)",
  },
  {
    title: "Call of Duty Black OPS",
    image: "/callofduty.jpg",
    platform: "PC / PS5 / Xbox",
  },
  {
    title: "FIFA 24",
    image: "/Fifa24.jpg",
    platform: "PC / PS5 / Xbox / Switch",
  },
  {
    title: "Elden Ring",
    image: "/eldenring.jpg",
    platform: "PC / PS5 / Xbox",
  },
  {
    title: "Overwatch 2",
    image: "/overwatch2.jpg",
    platform: "PC / PS5 / Xbox / Switch",
  },
  {
    title: "Fortnite",
    image: "/fortnite.jpg",
    platform: "PC / PS5 / Xbox / Switch / Mobile",
  },
  {
    title: "GTA V",
    image: "/gtav.png",
    platform: "PC / PS5 / Xbox",
  },
  {
    title: "Counter Strike 2",
    image: "/cs2.jpeg",
    platform: "PC Only",
  },
  {
    title: "Red Dead Redemption II",
    image: "/reddead.jpg",
    platform: "PC / PS5 / Xbox",
  },
  {
    title: "Baldur's Gate III",
    image: "/baldur.jpg",
    platform: "PC / PS5 / Xbox",
  },
  {
    title: "Minecraft",
    image: "/minecraft.jpg",
    platform: "PC / PS5 / Xbox / Switch / Mobile",
  },
  {
    title: "The Witcher 3",
    image: "/witcher3.jpg",
    platform: "PC / PS5 / Xbox / Switch",
  },
  {
    title: "God of War Ragnarök",
    image: "/godofwarv.jpg",
    platform: "PS5 (PC version expected 2025)",
  },
  {
    title: "Tekken 8",
    image: "/tekken8.jpg",
    platform: "PC / PS5 / Xbox",
  },
  {
    title: "NBA 2K25",
    image: "/NBA2k25.png",
    platform: "PC / PS5 / Xbox / Switch",
  },
  {
    title: "Apex Legends",
    image: "/apex.jpg",
    platform: "PC / PS5 / Xbox / Switch",
  },
  {
    title: "Mortal Kombat 11",
    image: "/kombat11.png",
    platform: "PC / PS5 / Xbox / Switch",
  },
  {
    title: "Gran Turismo 7",
    image: "/turismo7.jpg",
    platform: "PS5 Only",
  },
];

const Games = () => {
  return (
    <div className="text-white min-h-screen bg-gray-900 pt-28 px-8 pb-20">
      <h2 className="text-3xl font-bold mb-12 text-center">Available Games</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:scale-105 hover:border-emerald-400 hover:shadow-emerald-500/40 transition-all duration-300 max-w-[250px] w-full"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-36 object-cover rounded-t-lg"
            />
            <div className="p-3">
              <h3 className="text-lg font-semibold">{game.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{game.platform}</p>

              {/* ✅ Step 2: Link to booking page */}
              <Link to="/booking">
                <button className="mt-3 w-full bg-emerald-400 text-black font-bold py-2 px-4 rounded hover:bg-white transition">
                  Book
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
