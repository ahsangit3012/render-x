import React from "react";

const tournaments = [
  {
    title: "Valorant Championship",
    game: "Valorant",
    date: "July 15, 2025",
    prize: "AED 10,000",
    image: "/valo2.png",
  },
  {
    title: "FIFA eWorld Cup",
    game: "FIFA 24",
    date: "August 5, 2025",
    prize: "AED 8,000",
    image: "/fifa24.jpg",
  },
  {
    title: "CS2 Global Showdown",
    game: "Counter-Strike 2",
    date: "June 30, 2025",
    prize: "AED 12,000",
    image: "/cs2.jpeg",
  },
];

const Tournaments = () => {
  return (
    <div className="bg-[#0e0e1a] text-white min-h-screen px-4 py-10 sm:px-6 lg:px-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-b border-emerald-400 pb-2">
        🏆 Upcoming Tournaments
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tourney, index) => (
          <div
            key={index}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-all"
          >
            <img
              src={tourney.image}
              alt={tourney.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{tourney.title}</h3>
              <p className="text-sm text-gray-400">{tourney.game}</p>
              <p className="text-sm text-gray-500">{tourney.date}</p>
              <p className="mt-2 text-emerald-400 font-semibold">
                Prize: {tourney.prize}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
