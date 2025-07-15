import { useEffect, useState } from "react";
import UserPosts from "../../components/UserPosts";

export default function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [postLoadingError, setPostLoadingError] = useState(false);

  const fetchPosts = async () => {
    setPostLoading(true);
    try {
      const res = await fetch("http://localhost:8000/posts/mine/", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPosts(data);
      setPostLoading(false);
    } catch (error) {
      setPostLoadingError(error.message || "Something went wrong");
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:8000/posts/create/", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      setSuccessMsg("✅ Post created successfully!");
      fetchPosts();
      e.target.reset();
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg("");
      }, 1000);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">
        📦 Create a New Medicine Post
      </h2>

      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer w-64 h-40 border-2 border-dashed border-blue-400 flex flex-col items-center justify-center rounded-lg hover:border-blue-600 transition"
      >
        <div className="text-4xl text-blue-500">＋</div>
        <p className="text-blue-500 mt-2 font-semibold">New Post</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              📝 Add Medicine Post
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Medicine Name"
                className="w-full border px-3 py-2 rounded"
                required
              />

              <input
                name="expiry_date"
                type="date"
                className="w-full border px-3 py-2 rounded"
                required
              />

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full border px-3 py-2 rounded bg-white"
                  required
                />
              </div>

              <textarea
                name="description"
                placeholder="Description"
                className="w-full border px-3 py-2 rounded resize-none"
                rows="3"
                required
              ></textarea>

              {loading && (
                <div className="text-center text-blue-500">Posting...</div>
              )}
              {errorMsg && (
                <div className="text-center text-red-500">{errorMsg}</div>
              )}
              {successMsg && (
                <div className="text-center text-green-600">{successMsg}</div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      <UserPosts
        loading={postLoading}
        errorMsg={postLoadingError}
        posts={posts}
        fetchPosts={fetchPosts}
      />
    </div>
  );
}
