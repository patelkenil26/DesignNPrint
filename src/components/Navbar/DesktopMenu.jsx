// components/navbar/DesktopMenu.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ServiceDropdown from "./ServiceDropdown";

const DesktopMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <ul className="hidden lg:flex gap-8 items-center text-base font-medium tracking-wide">
      {[
        { label: "Home", to: "/" },
        { label: "About Us", to: "/about" },
        { label: "Contact", to: "/contact" },
      ].map((item) => (
        <li key={item.to}>
          <Link to={item.to} className="hover:text-yellow-500 transition duration-200">
            {item.label}
          </Link>
        </li>
      ))}
      <li
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <span className="cursor-pointer hover:text-yellow-500 transition duration-200">
          Services
        </span>
        <AnimatePresence>{isDropdownOpen && <ServiceDropdown />}</AnimatePresence>
      </li>
    </ul>
  );
};

export default DesktopMenu;
