"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ViewPaste = () => {
  const { pasteId } = useParams()
  const paste = useSelector((state) => state.paste.pastes.find((p) => p._id === pasteId))
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(paste.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!paste) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="text-center">
        <p className="text-4xl mb-3">🔍</p>
        <h1 className="text-lg font-semibold text-white mb-1">Paste not found</h1>
        <p className="text-[#666] text-sm mb-5">This paste may have been deleted.</p>
        <button onClick={() => navigate("/paste")} className="bg-[#0070f3] px-5 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-[#005ed4] transition-colors">
          View All Pastes
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate("/paste")} className="text-[#666] hover:text-white text-sm mb-5 transition-colors flex items-center gap-1">
          ← Back to pastes
        </button>

        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-white break-words">{paste.title}</h1>
              <p className="text-[#444] font-mono text-xs mt-1 break-all">ID: {paste._id}</p>
            </div>
            <button
              onClick={copy}
              className={`shrink-0 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                copied ? "bg-green-900/40 text-green-400 border border-green-900/40" : "bg-[#0070f3] hover:bg-[#005ed4] text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Content */}
          <div className="bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] p-3 md:p-4 overflow-x-auto max-h-96 md:max-h-[520px] mb-4">
            <p className="text-[#ccc] font-mono text-xs md:text-sm whitespace-pre-wrap break-words">{paste.content}</p>
          </div>

          <p className="text-[#444] text-xs">
            Created {new Date(paste.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste