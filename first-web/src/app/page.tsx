"use client";
import React, { useState } from 'react'
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter()



    const submit = async (e: React.FormEvent) => {
        e.preventDefault(); // ✅ prevent page reload

        try {
            const response = await axios.post("https://token-implement.vercel.app/api/auth/login",
                { email, password, },
                {
                    headers: { "Content-Type": "application/json" }
                });

            // ✅ adjust according to backend
            console.log("Full response:", response.data);


            // ✅ directly set token
            const token = response.data.token;
            localStorage.setItem("token", token);
            console.log("Saved token:", localStorage.getItem("token"));

            alert("Login successful 🎉");
            router.push("/dashboard");

            // if (response.data.token) {
            //     // ✅ Store token in sessionStorage
            //     sessionStorage.setItem("token", token);

            //     alert("Login successful 🎉");
            //     console.log("User data:", response.data);
            //     router.push("/dashboard")
            // }
        } catch (error: any) {
            console.error("Login error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Login failed");
        }
    };


    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center min-w-4xl'>
                <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-7 text-center">

                    <h2 className="text-xl font-semibold mb-1">Sign in with email</h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Make a new doc to bring your words, data, and teams together. For free
                    </p>
                    <div>
                        <div className='space-y-4'>
                            <form onSubmit={submit}>
                                <div className='mb-5 relative'>
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='relative'>
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaLock />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </span>
                                </div>

                                {/* Button */}
                                <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition cursor-pointer">
                                    Get Started
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
