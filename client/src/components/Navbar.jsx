"use client"

import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 w-full z-50 bg-black border-b border-[#2a2a2a] px-4 md:px-8 py-4 flex items-center justify-between">
      <button
        onClick={() => navigate("/")}
        className="text-lg md:text-2xl font-bold text-white hover:text-[#0070f3] transition-colors duration-200"
      >
        QuickPaste
      </button>
      <div className="flex gap-4 md:gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#0070f3] font-semibold text-sm md:text-base"
              : "text-[#999999] hover:text-white transition-colors duration-200 text-sm md:text-base"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/paste"
          className={({ isActive }) =>
            isActive
              ? "text-[#0070f3] font-semibold text-sm md:text-base"
              : "text-[#999999] hover:text-white transition-colors duration-200 text-sm md:text-base"
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
