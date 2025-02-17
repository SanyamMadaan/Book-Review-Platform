import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState("Login");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      setBtn("Logging in...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        { email, password }
      );

      console.log(response);

      if (response) {
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("token", token);
        navigate('/home');
      } else {
        alert('No user exists');
      }
    } catch (error) {
      setBtn("Login");
      console.log(error);
      alert(error.response?.data?.msg || "Error while logging in. Please try later.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={loginUser} className="space-y-4">
          <input
            type="email"
            placeholder="Enter registered email ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            {btn}
          </button>
        </form>

        {/* Admin Login */}
        <button
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => navigate('/Adminlogin')}
        >
          Admin Login
        </button>

        <p className="text-center mt-4 text-gray-600">
          New user? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/')}>Create Account</span>
        </p>
      </div>
    </div>
  );
}
