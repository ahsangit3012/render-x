import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Auth = () => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Signed in successfully!");
        navigate("/home");
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name: "Anonymous",
          email: result.user.email,
          photo: null,
          createdAt: new Date().toISOString(),
        });
        alert("Account created successfully!");
        setMode("signin");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date().toISOString(),
      });
      alert("Signed in with Google!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-black via-[#0f0f0f] to-black">
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-full font-semibold ${
            mode === "signin"
              ? "bg-emerald-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold ${
            mode === "signup"
              ? "bg-emerald-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-md transition"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-black font-bold py-2 rounded-md shadow-md hover:bg-gray-200 transition"
        >
          {mode === "signin" ? "Sign In with Google" : "Sign Up with Google"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
