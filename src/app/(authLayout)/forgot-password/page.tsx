"use client";
import { useState } from "react";
// import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    // JSON Parse
    const text = await res.text();
    console.log("Raw response:==========================", text);

    try {
      const data = JSON.parse(text);
      if (res.ok) {
        setMessage(data.message || "Password reset link sent successfully");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("JSON Parse Error:", err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded bg-white">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Reset
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </div>
  );
}
