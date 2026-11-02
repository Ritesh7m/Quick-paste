"use client"


import ThemeToggle from "./ThemeToggle"


import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"


const Navbar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)


  return (
    <nav className="fixed top-0 w-full z-50 bg-page border-b border-divider px-4 md:px-10 py-3.5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-primary font-bold text-base tracking-tight hover:text-link transition-colors"
        >
          ⚡ QuickPaste
        </button>


        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-md bg-accent text-white text-sm font-medium"
                  : "px-4 py-2 rounded-md text-muted hover:text-primary hover:bg-raised text-sm font-medium transition-colors"
              }
            >
              Create Paste
            </NavLink>
            <NavLink
              to="/paste"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-md bg-accent text-white text-sm font-medium"
                  : "px-4 py-2 rounded-md text-muted hover:text-primary hover:bg-raised text-sm font-medium transition-colors"
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
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-primary transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-primary transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>


      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden mt-3 pb-3 flex flex-col gap-1 border-t border-divider pt-3">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2.5 rounded-md bg-accent text-white text-sm font-medium"
                : "px-4 py-2.5 rounded-md text-muted hover:text-primary hover:bg-raised text-sm font-medium transition-colors"
            }
          >
            Create Paste
          </NavLink>
          <NavLink
            to="/paste"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2.5 rounded-md bg-accent text-white text-sm font-medium"
                : "px-4 py-2.5 rounded-md text-muted hover:text-primary hover:bg-raised text-sm font-medium transition-colors"
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