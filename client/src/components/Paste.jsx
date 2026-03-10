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
  const [shareModal, setShareModal] = useState(null)

  useEffect(() => { dispatch(fetchPastes()) }, [dispatch])

  const filteredData = pastes.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">Your Pastes</h1>
          <p className="text-[#666] text-sm mt-1">{pastes.length} paste{pastes.length !== 1 ? "s" : ""} saved</p>
        </div>

        {/* Search */}
        <input
          className="w-full px-4 py-2.5 rounded-lg bg-[#111] text-white border border-[#1e1e1e] placeholder-[#444] focus:outline-none focus:border-[#0070f3] text-sm transition-colors mb-5"
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-[#666] text-sm">No pastes found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredData.map((paste) => (
              <div
                key={paste._id}
                className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 md:p-5 hover:border-[#333] transition-colors"
              >
                {/* Top row: title + date */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="text-white font-semibold text-sm md:text-base leading-snug flex-1 min-w-0 truncate">
                    {paste.title}
                  </h2>
                  <p className="text-[#444] text-xs whitespace-nowrap pt-0.5 shrink-0">
                    {new Date(paste.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                {/* Slug + language badge */}
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-[#444] font-mono text-xs truncate">/p/{paste.slug}</p>
                  {paste.language && paste.language !== "text" && (
                    <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0070f3]/20 text-[#0070f3] border border-[#0070f3]/30 uppercase">
                      {paste.language}
                    </span>
                  )}
                </div>

                {/* Preview */}
                <div className="bg-[#0a0a0a] rounded-lg px-3 py-2.5 mb-3 border border-[#1a1a1a]">
                  <p className="text-[#777] font-mono text-xs line-clamp-2 whitespace-pre-wrap break-words">
                    {paste.content}
                  </p>
                </div>

                {/* Actions — scrollable on very small screens */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-3 py-1.5 rounded-md bg-[#0070f3] hover:bg-[#005ed4] text-white text-xs font-medium transition-colors"
                    onClick={() => navigate(`/p/${paste.slug}`)}
                  >View</button>
                  <button
                    className="px-3 py-1.5 rounded-md bg-[#1a1a1a] hover:bg-[#222] text-[#ccc] text-xs font-medium transition-colors"
                    onClick={() => navigate(`/?pasteId=${paste._id}`)}
                  >Edit</button>
                  <button
                    className="px-3 py-1.5 rounded-md bg-[#1a1a1a] hover:bg-[#222] text-[#ccc] text-xs font-medium transition-colors"
                    onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("Copied!") }}
                  >Copy</button>
                  <button
                    className="px-3 py-1.5 rounded-md bg-[#1a1a1a] hover:bg-[#222] text-[#ccc] text-xs font-medium transition-colors"
                    onClick={() => setShareModal(paste)}
                  >Share</button>
                  <button
                    className="px-3 py-1.5 rounded-md bg-red-950/40 hover:bg-red-950/70 text-red-400 text-xs font-medium transition-colors"
                    onClick={() => dispatch(removeFromPastes(paste._id))}
                  >Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0"
          onClick={() => setShareModal(null)}
        >
          <div
            className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white font-bold text-base mb-1">Share Paste</h2>
            <p className="text-[#666] text-xs mb-3">Copy the link below to share this paste.</p>
            <input
              readOnly
              value={`${window.location.origin}/p/${shareModal.slug}`}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] text-[#ccc] border border-[#2a2a2a] font-mono text-xs mb-4 focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                className="flex-1 py-2.5 rounded-lg bg-[#1a1a1a] hover:bg-[#222] text-white text-sm transition-colors"
                onClick={() => setShareModal(null)}
              >Close</button>
              <button
                className="flex-1 py-2.5 rounded-lg bg-[#0070f3] hover:bg-[#005ed4] text-white text-sm font-medium transition-colors"
                onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/p/${shareModal.slug}`); toast.success("Link copied!") }}
              >Copy Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Paste