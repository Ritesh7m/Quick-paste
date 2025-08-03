import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPastes, removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    dispatch(fetchPastes());
  }, [dispatch]);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleShare = (pasteId) => {
    const link = `${window.location.origin}/viewpaste/${pasteId}`;
    setShareLink(link);
    setShowModal(true);
  };

  return (
    <div className="px-6 md:px-12 py-10 min-h-screen bg-[#0F1A08]">
      <input
        className="w-full mt-15 p-3 rounded-lg bg-[#1F2D14] text-white border border-green-700 \
        placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-lime-500 shadow-sm"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-8">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="p-6 rounded-2xl border border-green-700 bg-white/10 \
              backdrop-blur-md text-white shadow-lg transition-transform hover:scale-[1.01]"
              style={{ boxShadow: "0 10px 40px rgba(10, 40, 10, 0.3)" }}
            >
              <h2 className="text-2xl font-bold mb-2 text-lime-300">{paste.title}</h2>
              <p className="text-white/90 mb-4">
                {paste.content.length > 100
                  ? paste.content.slice(0, 100) + "..."
                  : paste.content}
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition text-white text-sm"
                  onClick={() => navigate(`/?pasteId=${paste._id}`)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="px-4 py-2 rounded-md bg-green-700 hover:bg-green-800 transition text-white text-sm"
                  onClick={() => navigate(`/viewpaste/${paste._id}`)}
                >
                  👁️ View
                </button>

                <button
                  className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 transition text-white text-sm"
                  onClick={() => handleDelete(paste._id)}
                >
                  🗑️ Delete
                </button>

                <button
                  className="px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 transition text-white text-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  📋 Copy
                </button>

                <button
                  className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-800 transition text-white text-sm"
                  onClick={() => handleShare(paste._id)}
                >
                  🔗 Share
                </button>
              </div>

              <p className="text-xs text-gray-300 mt-3">
                Created At:{" "}
                {new Date(paste.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))
        ) : (
          <div className="text-white text-center text-lg font-medium mt-10">
            😕 No pastes found.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1F2D14] p-6 rounded-lg w-[90%] max-w-md shadow-2xl text-white border border-lime-600">
            <h2 className="text-xl font-bold mb-4 text-lime-300">🔗 Share Paste</h2>
            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full p-3 rounded-md bg-[#2A3B1F] text-white border border-green-500 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                ❌ Close
              </button>
              <button
                className="px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-800"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  toast.success("Link copied to clipboard!");
                }}
              >
                📋 Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paste;
