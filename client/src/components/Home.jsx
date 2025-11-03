"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { addToPastes, updateToPastes } from "../redux/pasteSlice"

const Home = () => {
  const [activeTab, setActiveTab] = useState("text")
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("pasteId")

  const dispatch = useDispatch()
  const pastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if (pasteId) {
      const editPaste = pastes.find((p) => p._id === pasteId)
      if (editPaste) {
        setTitle(editPaste.title)
        setValue(editPaste.content)
        setLanguage(editPaste.language || "javascript")
        setActiveTab(editPaste.language && editPaste.language !== "text" ? "code" : "text")
      }
    }
  }, [pasteId, pastes])

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      alert("Title and content must not be empty.")
      return
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      language: activeTab === "code" ? language : "text",
      _id: pasteId || undefined,
    }

    if (pasteId) {
      dispatch(updateToPastes(paste))
    } else {
      dispatch(addToPastes(paste))
    }

    setTitle("")
    setValue("")
    setLanguage("javascript")
    setActiveTab("text")
    setSearchParams({})
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-black pt-20 md:pt-24">
      <div className="w-full max-w-4xl bg-[#111111] border border-[#2a2a2a] shadow-lg rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-8">
          {pasteId ? "Update Your Paste" : "Create a New Paste"}
        </h1>

        <div className="flex gap-4 mb-6 border-b border-[#2a2a2a]">
          <button
            onClick={() => setActiveTab("text")}
            className={`px-4 py-2 font-medium transition ${
              activeTab === "text" ? "text-white border-b-2 border-[#0070f3]" : "text-[#666666] hover:text-white"
            }`}
          >
            Text Paste
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-2 font-medium transition ${
              activeTab === "code" ? "text-white border-b-2 border-[#0070f3]" : "text-[#666666] hover:text-white"
            }`}
          >
            Code Paste
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <input
            className="w-full p-3 rounded-lg bg-[#000000] text-white border border-[#2a2a2a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#0070f3] transition"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            {activeTab === "code" && (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-3 rounded-lg bg-[#000000] text-white border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#0070f3] transition"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
                <option value="bash">Bash</option>
                <option value="json">JSON</option>
              </select>
            )}
            <button
              onClick={createPaste}
              className="w-full sm:w-auto bg-[#0070f3] hover:bg-[#0051d3] text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>
          </div>
        </div>

        <textarea
          value={value}
          placeholder="Paste your content here..."
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-80 p-4 rounded-lg bg-[#000000] text-white placeholder-[#666666] border border-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#0070f3] resize-none font-mono text-sm transition"
        />
      </div>
    </div>
  )
}

export default Home
