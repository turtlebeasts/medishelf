import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/profile", {
          credentials: "include", // important for session
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">👤 Your Profile</h2>

      <div className="bg-white shadow rounded p-4">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Update Profile</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="New Username"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="New Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border rounded"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
