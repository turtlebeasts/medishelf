import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // ⬅️ if you're using Django session auth
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Login failed");
      }

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000); // ✅ redirect after login
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 text-center">
            Login successful! Redirecting...
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            name="username"
            onChange={handleChange}
            required
            placeholder="Username"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </section>
  );
}
