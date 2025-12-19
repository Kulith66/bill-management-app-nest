import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.email.trim() || !form.password.trim()) {
    alert("Please enter both email and password");
    return;
  }

  try {
    const res = await api.post("/auth/login", form);

    // Check if token exists
    if (!res.data.access_token) {
      alert(res.data.message || "Invalid credentials");
      return;
    }

    localStorage.setItem("token", res.data.access_token);
    navigate("/dashboard");
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    alert(err.response?.data?.message || "Invalid credentials");
  }
};


  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          className="w-full p-2 border rounded mb-3"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="text-blue-500 text-center mt-3 cursor-pointer"
        >
          Create an account
        </p>
      </form>
    </div>
  );
}
