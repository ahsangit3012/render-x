// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return navigate("/auth");

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data());
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully.");
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!userData)
    return <p className="text-white text-center mt-24">Loading...</p>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#0e0e0e] to-black text-white flex flex-col items-center pt-28 px-4">
      <div className="bg-[#111111] w-full max-w-md rounded-xl p-6 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <img
            src={userData.photo || "/useravatar.jpg"}
            alt="User"
            className="h-24 w-24 rounded-full border-4 border-emerald-500 object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold">{userData.name || "Anonymous"}</h2>
        <p className="text-sm text-gray-300">{userData.email}</p>
        <p className="text-xs mt-1 text-gray-500">UID: {userData.uid}</p>
        <button
          onClick={handleLogout}
          className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition"
        >
          Logout
        </button>
      </div>

      <div className="mt-10 w-full max-w-3xl bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">
          Your Orders
        </h3>
        <ul className="space-y-4 text-sm">
          <li className="bg-[#252525] p-4 rounded-lg flex justify-between">
            <span>🎮 Call of Duty - Elite Pack</span>
            <span className="text-gray-400">Order ID: #COD123</span>
          </li>
          <li className="bg-[#252525] p-4 rounded-lg flex justify-between">
            <span>⚔️ Valorant Tournament Slot - Solo</span>
            <span className="text-gray-400">Order ID: #VAL456</span>
          </li>
          <li className="bg-[#252525] p-4 rounded-lg flex justify-between">
            <span>🖥️ Gaming Keyboard - HyperX</span>
            <span className="text-gray-400">Order ID: #ACC789</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
