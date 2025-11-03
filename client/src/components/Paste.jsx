"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPastes, removeFromPastes } from "../redux/pasteSlice"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Paste = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pastes = useSelector((state) => state.paste.pastes)

  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [shareSlug, setShareSlug] = useState("")

  useEffect(() => {
    dispatch(fetchPastes())
  }, [dispatch])

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId))
  }

  const handleShare = (paste) => {
    const link = `${window.location.origin}/p/${paste.slug}`
    setShareLink(link)
    setShareSlug(paste.slug)
    setShowModal(true)
  }

  return (
    <div className="px-4 md:px-8 py-10 min-h-screen bg-black pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <input
          className="w-full p-3 rounded-lg bg-[#111111] text-white border border-[#2a2a2a] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#0070f3] transition"
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-col gap-4 mt-8">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste._id}
                className="p-5 md:p-6 rounded-lg border border-[#2a2a2a] bg-[#111111] text-white shadow-sm transition-all hover:border-[#0070f3] hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-white">{paste.title}</h2>
                    <p className="text-xs text-[#666666] mt-1 break-all">/p/{paste.slug}</p>
                  </div>
                  {paste.language && paste.language !== "text" && (
                    <span className="px-3 py-1 rounded text-xs font-semibold bg-[#0070f3] text-white whitespace-nowrap">
                      {paste.language.toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="bg-[#000000] rounded p-3 mb-4 border border-[#2a2a2a] max-h-24 overflow-hidden">
                  <p className="text-[#cccccc] font-mono text-xs md:text-sm break-words line-clamp-4">
                    {paste.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    className="px-3 py-2 rounded bg-[#0070f3] hover:bg-[#0051d3] transition text-white text-xs md:text-sm font-medium"
                    onClick={() => navigate(`/p/${paste.slug}`)}
                  >
                    View
                  </button>

                  <button
                    className="px-3 py-2 rounded bg-[#222222] hover:bg-[#333333] transition text-white text-xs md:text-sm font-medium"
                    onClick={() => navigate(`/?pasteId=${paste._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-2 rounded bg-[#222222] hover:bg-[#333333] transition text-white text-xs md:text-sm font-medium"
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content)
                      toast.success("Copied to clipboard")
                    }}
                  >
                    Copy
                  </button>

                  <button
                    className="px-3 py-2 rounded bg-[#222222] hover:bg-[#333333] transition text-white text-xs md:text-sm font-medium"
                    onClick={() => handleShare(paste)}
                  >
                    Share
                  </button>

                  <button
                    className="px-3 py-2 rounded bg-red-900/30 hover:bg-red-900/50 transition text-red-400 text-xs md:text-sm font-medium"
                    onClick={() => handleDelete(paste._id)}
                  >
                    Delete
                  </button>
                </div>

                <p className="text-xs text-[#666666] mt-3">
                  {new Date(paste.createdAt).toLocaleString("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="text-white text-center text-base font-medium mt-10 py-10">No pastes found.</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111111] p-6 rounded-lg w-full max-w-md shadow-xl text-white border border-[#2a2a2a]">
            <h2 className="text-xl font-bold mb-4">Share Paste</h2>
            <p className="text-sm text-[#999999] mb-3">Short URL:</p>
            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full p-3 rounded-md bg-[#000000] text-white border border-[#2a2a2a] mb-4 font-mono text-sm"
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-[#222222] hover:bg-[#333333] text-white transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 rounded-md bg-[#0070f3] hover:bg-[#0051d3] text-white transition font-medium"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink)
                  toast.success("Link copied to clipboard!")
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Paste
