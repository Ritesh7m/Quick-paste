"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const ViewPaste = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [paste, setPaste] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await axios.get(`/api/paste/slug/${slug}`)
        setPaste(res.data)
      } catch (err) {
        setError("Paste not found or access denied")
      } finally {
        setLoading(false)
      }
    }

    fetchPaste()
  }, [slug])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paste.content)
    alert("Copied to clipboard!")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{error}</h1>
          <button
            onClick={() => navigate("/paste")}
            className="mt-4 bg-[#0070f3] px-6 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{paste.title}</h1>
            <p className="text-xs text-gray-500 mt-1">
              Visibility: {paste.visibility.toUpperCase()}
            </p>
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-[#0070f3] px-4 py-2 rounded"
          >
            Copy
          </button>
        </div>

        <pre className="bg-black border border-[#2a2a2a] p-4 rounded overflow-auto">
          {paste.content}
        </pre>

        <p className="text-xs text-gray-500 mt-4">
          Created: {new Date(paste.createdAt).toLocaleString()}
        </p>

        <button
          onClick={() => navigate("/paste")}
          className="mt-6 bg-[#0070f3] px-6 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default ViewPaste
