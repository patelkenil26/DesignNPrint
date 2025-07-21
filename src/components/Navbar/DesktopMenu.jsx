import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ServiceDropdown from "./ServiceDropdown";

const DesktopMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <ul className="hidden lg:flex gap-10 items-center text-base font-medium tracking-wide">
      {[
        { label: "Home", to: "/" },
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
      ].map((item) => (
        <li key={item.to}>
          <Link to={item.to} className="group relative inline-block text-white">
            <span>{item.label}</span>
            {/* Yellow glowing underline */}
            <span className="absolute left-0 -bottom-1 h-[2px] bg-yellow-400 opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-500 rounded-full shadow-[0_0_12px_3px_rgba(255,230,0,0.8)]"></span>
          </Link>
        </li>
      ))}

      <li
        className="relative group inline-block text-white"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <span className="cursor-pointer">Services</span>
        {/* Yellow glowing underline for dropdown */}
        <span className="absolute left-0 -bottom-1 h-[2px] bg-yellow-400 opacity-0 group-hover:opacity-100 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-all duration-500 rounded-full shadow-[0_0_12px_3px_rgba(255,230,0,0.8)]"></span>

        <AnimatePresence>
          {isDropdownOpen && <ServiceDropdown />}
        </AnimatePresence>
      </li>
    </ul>
  );
};

export default DesktopMenu;
