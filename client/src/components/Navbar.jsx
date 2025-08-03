import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#18230F]/95 text-white shadow-md px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-wide text-lime-300">Quick Paste</h1>
      <div className="flex gap-8 text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-lime-400 font-semibold"
              : "hover:text-lime-300 transition-colors duration-200"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/paste"
          className={({ isActive }) =>
            isActive
              ? "text-lime-400 font-semibold"
              : "hover:text-lime-300 transition-colors duration-200"
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
