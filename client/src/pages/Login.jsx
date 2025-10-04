import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill in all fields");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-[#FFD700]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-md border border-[#FFD700]/30"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-[#FFD700] outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:border-[#FFD700] outline-none"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded-md hover:bg-yellow-400 transition"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span className="text-[#FFD700] cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
