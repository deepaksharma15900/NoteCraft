import React from 'react'
import { NavLink } from 'react-router-dom'
import download from '../assets/download.png'; // ✅ Correct import

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    `cursor-pointer transition duration-200 px-4 py-2 rounded-lg
    ${isActive 
      ? "text-white bg-blue-600 shadow-md font-semibold" 
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
            <NavLink className="flex items-center space-x-2" to={"/"}>
              <img src={download} alt="Logo" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-blue-600">NoteCraft</h1>
            </NavLink>

          {/* Nav Links */}
          <div className="flex space-x-6">
            <NavLink className={linkClasses} to="/">
              Home
            </NavLink>
            <NavLink className={linkClasses} to="/pastes">
              Pastes
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
