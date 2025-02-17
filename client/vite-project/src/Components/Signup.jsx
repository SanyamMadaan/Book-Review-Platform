import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [btn, setBtn] = useState("Create Account");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    try {
      setBtn("Creating account...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
        { email, password, mobile, firstName, lastName }
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
      setBtn("Create Account");
      console.log(error);
      alert(error.response?.data?.msg || "Error while creating account. Please try later.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={loginUser} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email ID"
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
          <input
            type="text"
            placeholder="Enter Mobile"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            {btn}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already a user? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}
