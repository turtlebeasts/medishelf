// components/GuestNavbar.jsx
import { Link } from "react-router-dom";

export default function GuestNavbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MediShelf
      </Link>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-blue-600">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
