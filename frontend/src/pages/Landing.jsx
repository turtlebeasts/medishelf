// src/pages/Landing.jsx
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          Welcome to <span className="text-blue-600">MediShelf</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          A community-driven platform to share and receive spare medicines,
          reduce waste, and help lives.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-medium transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-md text-lg font-medium transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
