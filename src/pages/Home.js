import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.id]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      alert("❌ Something went wrong. Check console.");
      console.error(err);
    }
  };

  return (
    <div className="text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/2ndvalo.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Unleash Your Gaming Power <br />
            with <span className="text-emerald-400">Render-X</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Join the ultimate gaming experience. Watch live streams, compete in
            tournaments, and stay updated with eSports news!
          </p>
          <Link to="/auth">
            <button className="bg-emerald-400 px-8 py-4 rounded-full font-semibold hover:bg-white transition shadow-lg text-black">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-12">Explore Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <FeatureCard
            title="Booking"
            description="Reserve your spot for upcoming tournaments and game sessions."
            icon="📅"
          />
          <FeatureCard
            title="ESports News"
            description="Get the latest news here for the gaming world."
            icon="📰"
          />
          <FeatureCard
            title="Game Tournaments"
            description="See the results for the Esports tournament held here or out in the world."
            icon="🏆"
          />
        </div>
      </section>

      {/* Tournaments and News Section */}
      <section className="py-16 bg-gray-800 text-white px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <TournamentSection />
          <NewsSection />
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-16 bg-gray-900 text-white px-8 relative">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Games</h2>

        {/* Left Arrow */}
        <button
          onClick={() => {
            const carousel = document.getElementById("game-carousel");
            carousel.scrollLeft -= carousel.offsetWidth;
            if (carousel.scrollLeft <= 0) {
              carousel.scrollLeft = carousel.scrollWidth;
            }
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
        >
          &lt;
        </button>

        <div
          id="game-carousel"
          className="flex justify- space-x-6 overflow-x-auto scrollbar-hide px-16 scroll-smooth"
        >
          {[
            { title: "Cyberpunk 2077", genre: "RPG", img: "/cyberpunk.jpg" },
            { title: "Call of Duty", genre: "FPS", img: "/callofduty.jpg" },
            { title: "FIFA 24", genre: "Sports", img: "/fifa24.jpg" },
            { title: "GTA V", genre: "Action", img: "/gtav.png" },
            { title: "Minecraft", genre: "Sandbox", img: "/minecraft.jpg" },
            {
              title: "The Last of Us",
              genre: "Adventure",
              img: "/lastofus.jpg",
            },
            { title: "Valorant", genre: "Action", img: "/valo2.png" },
            { title: "Fortnite", genre: "Battle Royale", img: "/fortnite.jpg" },
            // Add as many new games as you like!
            { title: "PUBG", genre: "Battle Royale", img: "/pubg.jpg" },
            {
              title: "Apex Legends",
              genre: "Battle Royale",
              img: "/apex.jpg",
            },
          ].map((game, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg min-w-[200px] hover:scale-105 transform transition duration-300 shadow-lg"
            >
              <img
                src={game.img}
                alt={game.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold">{game.title}</h3>
              <p className="text-gray-400 text-sm">{game.genre}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => {
            const carousel = document.getElementById("game-carousel");
            carousel.scrollLeft += carousel.offsetWidth;
            if (
              carousel.scrollLeft >=
              carousel.scrollWidth - carousel.offsetWidth
            ) {
              carousel.scrollLeft = 0;
            }
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
        >
          &gt;
        </button>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800 text-white px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">What Gamers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: "Alex G.",
              quote:
                "Render-X is the best platform I’ve ever used to join tournaments!",
              avatar: "/avatar1.jpg",
            },
            {
              name: "Mina R.",
              quote:
                "The booking experience is smooth and the events are top-tier.",
              avatar: "/avatar2.jpg",
            },
            {
              name: "Jake T.",
              quote:
                "Love the UI and the curated gaming news. It’s my daily dose!",
              avatar: "/avatar4.jpg",
            },
            {
              name: "Mia",
              quote: "The service is awesome.",
              avatar: "/avatar3.jpg",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-gray-700 p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 mx-auto rounded-full mb-4"
              />
              <p className="text-lg italic">"{review.quote}"</p>
              <h4 className="mt-4 font-bold">{review.name}</h4>
            </div>
          ))}
        </div>
      </section>
      {/* Contact Us Section */}
      <section className="py-16 bg-gray-900 text-white px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <form className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-md">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-400 hover:bg-white text-black font-bold py-3 px-6 rounded-full transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4">
        <p className="text-gray-400 text-sm">
          © 2025 Render-X. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Tournament Section Component
const TournamentSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8">Upcoming Tournaments</h2>
    <div className="space-y-6">
      {[
        {
          title: "League Champions Cup",
          game: "League of Legends",
          date: "June 25, 2025",
          prize: "AED 7000",
        },
        {
          title: "CS:GO Masters",
          game: "Counter-Strike 2",
          date: "June 15, 2025",
          prize: "AED 9000",
        },
        {
          title: "Valorant Elite",
          game: "Valorant",
          date: "July 1, 2025",
          prize: "AED 9000",
        },
      ].map((tournament, index) => (
        <div
          key={index}
          className="bg-gray-800 border border-gray-700 p-6 rounded-lg flex justify-between items-center hover:scale-105 hover:border-emerald-400 hover:shadow-md transition duration-300"
        >
          <div>
            <h3 className="text-xl font-bold">{tournament.title}</h3>
            <p className="text-gray-400">{tournament.game}</p>
            <p className="text-gray-500">{tournament.date}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl">🏆</span>
            <p className="text-[#A78BFA] font-semibold mt-2">
              {tournament.prize}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// News Section Component
const NewsSection = () => (
  <div>
    <h2 className="text-3xl font-bold mb-8">Latest Gaming News</h2>
    <div className="space-y-6">
      {[
        {
          title: "Valorant Mobile Launched",
          desc: "Riot Games launches Valorant Mobile on April 21, 2025.",
          img: "/valombl1.jpg",
          downloadLink: "https://playvalorant.com/en-us/download/",
        },
        {
          title: "Fortnite OG Season Returns",
          desc: "Epic Games reintroduces classic maps and weapons, exciting long-time players with a nostalgic update.",
          img: "/fortnite.jpg",
          downloadLink: "https://www.fortnite.com/download?lang=en-US",
        },
        {
          title: "GTA VI Trailer Release Confirmed",
          desc: "Rockstar Games announces the official trailer release date for the much-anticipated GTA VI.",
          img: "/gtavi.jpg",
        },
        {
          title: "Call of Duty Black Ops: New Title Announced",
          desc: "Activision teases the next installment of the Black Ops series, promising a darker storyline and next-gen graphics.",
          img: "/callofduty.jpg",
        },
      ].map((news, index) => (
        <div
          key={index}
          className="bg-gray-800 border border-gray-700 p-4 rounded-lg flex flex-col md:flex-row items-center hover:scale-105 hover:border-emerald-400 hover:shadow-md transition duration-300"
        >
          <img
            src={news.img}
            alt="News"
            className="w-20 h-20 rounded-lg object-cover mr-4"
          />
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-semibold">{news.title}</h4>
            <p className="text-gray-400 text-sm mb-4">{news.desc}</p>
            {news.downloadLink && (
              <a
                href={news.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FF5733] px-4 py-2 text-sm rounded-full font-medium text-white hover:bg-[#e74c3c] transition"
              >
                Download
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Home;
