"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPasteBySlug } from "../redux/pasteSlice"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"

const ShortViewPaste = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPaste = useSelector((state) => state.paste.currentPaste)
  const loading = useSelector((state) => state.paste.loading)
  const [highlighted, setHighlighted] = useState("")

  useEffect(() => {
    dispatch(fetchPasteBySlug(slug))
  }, [slug, dispatch])

  useEffect(() => {
    if (currentPaste && currentPaste.language && currentPaste.language !== "text") {
      try {
        const result = hljs.highlight(currentPaste.content, { language: currentPaste.language, ignoreIllegals: true })
        setHighlighted(result.value)
      } catch (err) {
        setHighlighted(currentPaste.content)
      }
    }
  }, [currentPaste])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white pt-20">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!currentPaste) {
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
    navigator.clipboard.writeText(currentPaste.content)
    alert("Copied to clipboard!")
  }

  const renderContent = () => {
    const language = currentPaste.language || "text"

    if (language === "text") {
      return (
        <div className="bg-[#000000] rounded border border-[#2a2a2a] p-4 overflow-x-auto max-h-96">
          <p className="text-[#cccccc] font-mono text-sm whitespace-pre-wrap break-words">{currentPaste.content}</p>
        </div>
      )
    }

    return (
      <div className="bg-[#000000] rounded border border-[#2a2a2a] p-4 overflow-x-auto max-h-96">
        <pre className="font-mono text-sm m-0">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-[#111111] border border-[#2a2a2a] shadow-lg rounded-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white break-words">{currentPaste.title}</h1>
            <p className="text-xs text-[#666666] mt-2">/p/{slug}</p>
            {currentPaste.language && currentPaste.language !== "text" && (
              <span className="inline-block mt-3 px-3 py-1 rounded text-xs font-semibold bg-[#0070f3] text-white">
                {currentPaste.language.toUpperCase()}
              </span>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-[#0070f3] hover:bg-[#0051d3] px-4 py-2 rounded transition text-white text-sm font-medium whitespace-nowrap"
          >
            Copy
          </button>
        </div>

        {renderContent()}

        <p className="mt-6 text-xs text-[#666666]">Created: {new Date(currentPaste.createdAt).toLocaleString()}</p>

        <button
          onClick={() => navigate("/paste")}
          className="mt-6 bg-[#0070f3] hover:bg-[#0051d3] px-6 py-2 rounded transition text-white font-medium"
        >
          Back to Pastes
        </button>
      </div>
    </div>
  )
}

export default ShortViewPaste
