import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AdminLogin() {
    
    useEffect(()=>{
        alert("For login admin@gmail.com and Password is 12345");
    
    },[]);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btn, setBtn] = useState("Login");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setBtn("Logging in...");

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/adminlogin`, {
                email,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setBtn("Login");
            alert(err.response?.data?.msg || "Error logging in. Please try again.");
        }
    }

    return (
        
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter admin email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200" type="submit">
                        {btn}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Not an admin? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Go to User Login</span>
                </p>
            </div>
        </div>
    );
}
