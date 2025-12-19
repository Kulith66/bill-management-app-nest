import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: form.email,
      password: form.password,
      name: form.name.trim() === "" ? undefined : form.name,
    };

    try {
      await api.post("/auth/signup", payload);

      alert("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      console.log("REG ERROR:", error.response?.data);

      const msg =
        error.response?.data?.message || "Registration failed";

      alert(msg); // show backend errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          className="w-full p-2 border rounded mb-3"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          name="name"
          placeholder="Name (optional)"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p
          onClick={() => navigate("/")}
          className="text-blue-500 text-center mt-3 cursor-pointer"
        >
          Already have an account?
        </p>
      </form>
    </div>
  );
}
