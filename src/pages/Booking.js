import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  initializeGapi,
  signInWithGoogle,
  createCalendarEvent,
} from "../utils/googleCalendar";

const Booking = () => {
  const [mode, setMode] = useState("gaming");
  const [form, setForm] = useState({
    pc: "",
    time: "",
    name: "",
    email: "",
    gameName: "",
    tournamentName: "",
    teamType: "solo",
    numberOfPlayers: "",
    tournamentDateTime: "",
  });

  useEffect(() => {
    initializeGapi();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const templateParams =
      mode === "gaming"
        ? {
            name: form.name,
            time: form.time,
            pc: form.pc,
            email: form.email,
            to_email: form.email,
          }
        : {
            player_name: form.name,
            email: form.email,
            game_name: form.gameName,
            tournament_name: form.tournamentName,
            mode: form.teamType,
            players: form.teamType === "team" ? form.numberOfPlayers : "1",
            datetime: form.tournamentDateTime,
            to_email: form.email,
          };

    try {
      await emailjs.send(
        "service_h5q5lwk",
        mode === "gaming" ? "template_b3eg6ds" : "template_box7f1q",
        templateParams,
        "LEjNbva7cItXZoDDR"
      );

      if (mode === "tournament") {
        const event = {
          summary: form.tournamentName,
          description: `Game: ${form.gameName} | Mode: ${form.teamType}`,
          start: {
            dateTime: new Date(form.tournamentDateTime).toISOString(),
            timeZone: "Asia/Dubai",
          },
          end: {
            dateTime: new Date(
              new Date(form.tournamentDateTime).getTime() + 60 * 60 * 1000
            ).toISOString(),
            timeZone: "Asia/Dubai",
          },
        };

        await signInWithGoogle();
        await createCalendarEvent(
          `Tournament: ${form.tournamentName}`,
          `Player: ${form.name}, Game: ${form.gameName}`,
          new Date(form.tournamentDateTime).toISOString(),
          new Date(
            new Date(form.tournamentDateTime).getTime() + 60 * 60 * 1000
          ).toISOString() // +1 hour
        );
      }

      alert(
        mode === "gaming"
          ? `✅ Booking confirmed for ${form.pc} at ${form.time}!\nConfirmation sent to ${form.email}`
          : `✅ Tournament slot booked for ${form.tournamentName}!\nConfirmation sent to ${form.email}`
      );

      setForm({
        pc: "",
        time: "",
        name: "",
        email: "",
        gameName: "",
        tournamentName: "",
        teamType: "solo",
        numberOfPlayers: "",
        tournamentDateTime: "",
      });
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Booking failed. Please try again.");
    }
  };

  return (
    <section className="bg-gray-950 text-white min-h-screen flex flex-col justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-emerald-400">
          {mode === "gaming"
            ? "Book Your Gaming Slot 🎮"
            : "Book Your Tournament Slot 🏆"}
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode("gaming")}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              mode === "gaming"
                ? "bg-emerald-500 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Gaming Slot
          </button>
          <button
            onClick={() => setMode("tournament")}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              mode === "tournament"
                ? "bg-emerald-500 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Tournament Slot
          </button>
        </div>

        <form
          onSubmit={handleBooking}
          className="neon-box bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl space-y-6"
        >
          {mode === "gaming" ? (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Select PC
                </label>
                <select
                  name="pc"
                  value={form.pc}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">-- Choose a PC --</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={`PC ${i + 1}`}>
                      {`PC ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Select Time Slot
                </label>
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="">-- Choose a time --</option>
                  {[
                    "12:00 PM - 2:00 PM",
                    "2:00 PM - 4:00 PM",
                    "4:00 PM - 6:00 PM",
                    "6:00 PM - 8:00 PM",
                    "8:00 PM - 10:00 PM",
                    "10:00 PM - 12:00 AM",
                    "12:00 AM - 2:00 AM",
                  ].map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Game Name
                </label>
                <input
                  name="gameName"
                  value={form.gameName}
                  onChange={handleChange}
                  required
                  placeholder="Enter game name"
                  className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Tournament Name
                </label>
                <input
                  name="tournamentName"
                  value={form.tournamentName}
                  onChange={handleChange}
                  required
                  placeholder="Enter tournament name"
                  className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Team or Solo
                </label>
                <select
                  name="teamType"
                  value={form.teamType}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="solo">Solo</option>
                  <option value="team">Team</option>
                </select>
              </div>

              {form.teamType === "team" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Number of Players
                  </label>
                  <input
                    type="number"
                    name="numberOfPlayers"
                    value={form.numberOfPlayers}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 5"
                    className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="tournamentDateTime"
                  value={form.tournamentDateTime}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-6 rounded-md transition shadow-md hover:shadow-lg"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
