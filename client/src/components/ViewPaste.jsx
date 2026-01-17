"use client"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ViewPaste = () => {
  const { pasteId } = useParams()
  const paste = useSelector((state) => state.paste.pastes.find((p) => p._id === pasteId))
  const navigate = useNavigate()

  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Paste not found</h1>
          <button
            onClick={() => navigate("/paste")}
            className="mt-4 bg-[#0070f3] px-6 py-2 rounded text-white hover:bg-[#0051d3] transition font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paste.content)
    alert("Copied to clipboard!")
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-[#111111] border border-[#2a2a2a] shadow-lg rounded-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white break-words">{paste.title}</h1>
            <p className="text-xs text-[#666666] mt-2">ID: {paste._id}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-[#0070f3] hover:bg-[#0051d3] px-4 py-2 rounded transition text-white text-sm font-medium whitespace-nowrap"
          >
            Copy
          </button>
        </div>

        <div className="bg-[#000000] rounded border border-[#2a2a2a] p-4 mb-6 overflow-x-auto max-h-96">
          <p className="text-[#cccccc] font-mono text-sm whitespace-pre-wrap break-words">{paste.content}</p>
        </div>

        <p className="text-xs text-[#666666] mb-4">Created: {new Date(paste.createdAt).toLocaleString()}</p>

        <button
          onClick={() => navigate("/paste")}
          className="bg-[#0070f3] hover:bg-[#0051d3] px-6 py-2 rounded transition text-white font-medium"
        >
          Back to Pastes
        </button>
      </div>
    </div>
  )
}

export default ViewPaste
