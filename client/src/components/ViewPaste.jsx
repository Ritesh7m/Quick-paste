import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { pasteId } = useParams();
  const paste = useSelector((state) =>
    state.paste.pastes.find((p) => p._id === pasteId)
  );
  const navigate = useNavigate();

  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#18230F]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Paste not found</h1>
          <button
            onClick={() => navigate("/paste")}
            className="mt-4 bg-lime-700 px-6 py-2 rounded text-white hover:bg-lime-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-15 pb-5 px-4 bg-[#18230F] text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-green-800 shadow-2xl rounded-3xl p-6 md:p-10 ">
        <h1 className="text-3xl font-bold mb-4 text-lime-400">{paste.title}</h1>
        <p className="text-green-100 whitespace-pre-wrap">{paste.content}</p>
        <p className="mt-6 text-sm text-gray-300">
          Created at: {new Date(paste.createdAt).toLocaleString()}
        </p>
        <button
          onClick={() => navigate("/paste")}
          className="mt-6 bg-lime-600 hover:bg-lime-700 px-6 py-2 rounded"
        >
          Back to Pastes
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
