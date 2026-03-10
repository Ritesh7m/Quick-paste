"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { addToPastes, updateToPastes } from "../redux/pasteSlice"

const LANGUAGES = ["javascript","python","java","cpp","csharp","html","css","sql","bash","json"]

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
    <div className="min-h-screen w-full bg-[#0a0a0a] pt-20 pb-10 px-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            {pasteId ? "Edit Paste" : "Create New Paste"}
          </h1>
          <p className="text-[#666] text-sm mt-1">
            {pasteId ? "Update your existing paste below." : "Add a title, paste your content, and save."}
          </p>
        </div>

        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 md:p-6 flex flex-col gap-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-[#888] mb-2 uppercase tracking-wider">Title</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] text-white border border-[#2a2a2a] placeholder-[#444] focus:outline-none focus:border-[#0070f3] text-sm transition-colors"
              type="text"
              placeholder="Give your paste a name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Tabs */}
          <div>
            <label className="block text-xs font-medium text-[#888] mb-2 uppercase tracking-wider">Type</label>
            <div className="flex gap-2">
              {["text", "code"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? "bg-[#0070f3] text-white"
                      : "bg-[#1a1a1a] text-[#888] hover:text-white"
                  }`}
                >
                  {tab === "text" ? "Plain Text" : "Code"}
                </button>
              ))}
            </div>
          </div>

          {/* Language selector */}
          {activeTab === "code" && (
            <div>
              <label className="block text-xs font-medium text-[#888] mb-2 uppercase tracking-wider">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 rounded-lg bg-[#0a0a0a] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#0070f3] text-sm transition-colors"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-xs font-medium text-[#888] mb-2 uppercase tracking-wider">Content</label>
            <textarea
              value={value}
              placeholder="Paste your content here..."
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-56 md:h-72 px-4 py-3 rounded-lg bg-[#0a0a0a] text-white placeholder-[#444] border border-[#2a2a2a] focus:outline-none focus:border-[#0070f3] resize-none font-mono text-sm transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            onClick={createPaste}
            className="w-full sm:w-auto sm:self-end bg-[#0070f3] hover:bg-[#005ed4] text-white font-semibold py-3 px-8 rounded-lg transition-colors text-sm"
          >
            {pasteId ? "Update Paste" : "Save Paste"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home