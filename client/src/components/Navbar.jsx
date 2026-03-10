"use client"

import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a] border-b border-[#1e1e1e] px-4 md:px-10 py-3.5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-white font-bold text-base tracking-tight hover:text-[#0070f3] transition-colors"
        >
          ⚡ QuickPaste
        </button>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-md bg-[#0070f3] text-white text-sm font-medium"
                : "px-4 py-2 rounded-md text-[#888] hover:text-white hover:bg-[#1a1a1a] text-sm font-medium transition-colors"
            }
          >
            Create Paste
          </NavLink>
          <NavLink
            to="/paste"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-md bg-[#0070f3] text-white text-sm font-medium"
                : "px-4 py-2 rounded-md text-[#888] hover:text-white hover:bg-[#1a1a1a] text-sm font-medium transition-colors"
            }
          >
            View Pastes
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden mt-3 pb-3 flex flex-col gap-1 border-t border-[#1e1e1e] pt-3">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2.5 rounded-md bg-[#0070f3] text-white text-sm font-medium"
                : "px-4 py-2.5 rounded-md text-[#888] hover:text-white hover:bg-[#1a1a1a] text-sm font-medium transition-colors"
            }
          >
            Create Paste
          </NavLink>
          <NavLink
            to="/paste"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2.5 rounded-md bg-[#0070f3] text-white text-sm font-medium"
                : "px-4 py-2.5 rounded-md text-[#888] hover:text-white hover:bg-[#1a1a1a] text-sm font-medium transition-colors"
            }
          >
            View Pastes
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar