import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function UserPosts({ fetchPosts, posts, loading, errorMsg }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/posts/delete/${selectedPostId}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      fetchPosts();
      setShowModal(false);
      setSelectedPostId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (errorMsg) return <p className="text-center text-red-500">{errorMsg}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🧾 My Medicine Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">You haven't posted anything yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded shadow relative group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">
                Expiry: {post.expiry_date}
              </p>
              <p className="mt-2 text-sm">{post.description}</p>

              {/* Delete Button */}
              <button
                onClick={() => {
                  setSelectedPostId(post.id);
                  setShowModal(true);
                }}
                className="bg-red-700 text-white font-bold hover:bg-red-800 rounded-sm flex justify-center items-center py-1 px-2 mt-2"
              >
                <MdDeleteForever /> Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">❗ Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
