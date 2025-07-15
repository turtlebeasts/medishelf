import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm_password) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || JSON.stringify(data);
        throw new Error(errorMessage);
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000); // redirect after 2s
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 text-center">
            Registration successful! Redirecting...
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            name="username"
            required
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="email"
            type="email"
            required
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="confirm_password"
            type="password"
            required
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
