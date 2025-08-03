import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const editPaste = pastes.find((p) => p._id === pasteId);
      if (editPaste) {
        setTitle(editPaste.title);
        setValue(editPaste.content);
      }
    }
  }, [pasteId, pastes]);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      alert("Title and content must not be empty.");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || undefined,
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-[#18230F]">
      <div
        className="w-full max-w-7xl h-[600px] bg-white/10 backdrop-blur-md border border-green-800 shadow-2xl rounded-3xl p-6 md:p-10"
        style={{ boxShadow: "0 16px 80px 0 rgba(10, 35, 10, 0.35)" }}
      >
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-white mb-8 drop-shadow-md">
          {pasteId ? "Update Your Paste" : "Create a New Paste"}
        </h1>

        <div className="flex flex-col gap-4 md:flex-row mb-6">
          <input
            className="flex-1 p-4 rounded-xl bg-[#1F2D14] text-white border border-green-700 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-lime-500"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className="w-full md:w-auto bg-gradient-to-r from-lime-700 via-green-700 to-emerald-800 hover:from-lime-800 hover:to-green-900 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 shadow-lg focus:ring-4 focus:ring-lime-300"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        <textarea
          value={value}
          placeholder="Paste your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          className="w-full h-[330px] p-5 rounded-xl bg-[#1F2D14] text-white placeholder-green-300 border border-green-700 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none shadow-sm min-h-[200px]"
        />
      </div>
    </div>
  );
};

export default Home;