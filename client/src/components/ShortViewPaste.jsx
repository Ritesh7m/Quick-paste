"use client"


import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPasteBySlug } from "../redux/pasteSlice"
import hljs from "highlight.js"


const ShortViewPaste = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPaste = useSelector((state) => state.paste.currentPaste)
  const loading = useSelector((state) => state.paste.loading)
  const [highlighted, setHighlighted] = useState("")
  const [copied, setCopied] = useState(false)


  useEffect(() => { dispatch(fetchPasteBySlug(slug)) }, [slug, dispatch])


  useEffect(() => {
    if (currentPaste?.language && currentPaste.language !== "text") {
      try {
        const result = hljs.highlight(currentPaste.content, { language: currentPaste.language, ignoreIllegals: true })
        setHighlighted(result.value)
      } catch { setHighlighted(currentPaste.content) }
    }
  }, [currentPaste])


  const copy = () => {
    navigator.clipboard.writeText(currentPaste.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <p className="text-muted text-sm">Loading...</p>
    </div>
  )


  if (!currentPaste) return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="text-center">
        <p className="text-4xl mb-3">🔍</p>
        <h1 className="text-lg font-semibold text-primary mb-1">Paste not found</h1>
        <p className="text-muted text-sm mb-5">This paste may have been deleted.</p>
        <button onClick={() => navigate("/paste")} className="bg-accent px-5 py-2.5 rounded-lg text-white text-sm font-medium hover:bg-accent-hover transition-colors">
          View All Pastes
        </button>
      </div>
    </div>
  )


  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-page text-primary">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate("/paste")} className="text-muted hover:text-primary text-sm mb-5 transition-colors flex items-center gap-1">
          ← Back to pastes
        </button>


        <div className="bg-surface border border-divider rounded-xl p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-primary break-words">{currentPaste.title}</h1>
              <div className="flex items-center flex-wrap gap-2 mt-1.5">
                <p className="text-muted font-mono text-xs">/p/{slug}</p>
                {currentPaste.language && currentPaste.language !== "text" && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent/20 text-link border border-accent/30 uppercase">
                    {currentPaste.language}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={copy}
              className={`shrink-0 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                copied ? "bg-success-surface text-success border border-success" : "bg-accent hover:bg-accent-hover text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>


          {/* Code/content */}
          <div className="bg-page rounded-lg border border-divider p-3 md:p-4 overflow-x-auto max-h-96 md:max-h-[520px]">
            {currentPaste.language && currentPaste.language !== "text" ? (
              <pre className="font-mono text-xs md:text-sm m-0"><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
            ) : (
              <p className="text-primary font-mono text-xs md:text-sm whitespace-pre-wrap break-words">{currentPaste.content}</p>
            )}
          </div>


          <p className="mt-4 text-muted text-xs">
            Created {new Date(currentPaste.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      </div>
    </div>
  )
}


export default ShortViewPaste