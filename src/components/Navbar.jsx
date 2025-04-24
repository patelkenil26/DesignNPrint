import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../data/servicesData";
import { Menu, X } from "lucide-react";
import navLogo from "../images/Logo/DesignNPrint.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(value)
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <nav className="bg-gray-800 text-white font-poppins shadow-md"> {/* गहरा नीला पृष्ठभूमि */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={"/"} className="hover:text-yellow-500 transition-all hover:scale-105"> {/* पीला होवर */}
          <img src={navLogo} alt="Logo" className="w-36 sm:w-44" />
        </Link>

        <button className="lg:hidden focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />} {/* सफेद मेनू आइकन */}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-8 items-center text-base font-medium tracking-wide">
          {[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/about" },
            { label: "Contact", to: "/contact" },
          ].map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="hover:text-yellow-500 transition duration-200"> {/* पीला होवर */}
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
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-52 bg-white text-blue-900 shadow-xl rounded-xl overflow-hidden z-50" 
                >
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/services/${service.id}`}
                        className="block px-4 py-2 hover:bg-yellow-500 hover:text-white transition-all" 
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Search */}
        <div className="hidden lg:block relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 rounded-full border border-gray-300 text-black font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500" 
          />
          {searchTerm && filteredResults.length > 0 && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded-xl shadow-xl w-60 z-50"> {/* सफेद पृष्ठभूमि, काला टेक्स्ट */}
              {filteredResults.map((result) => (
                <li key={result.id}>
                  <Link
                    to={`/services/${result.id}`}
                    className="block px-4 py-2 hover:bg-yellow-500 hover:text-white transition" 
                    onClick={() => setSearchTerm("")}
                  >
                    {result.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="lg:hidden bg-blue-800 px-4 py-4 shadow-inner" 
          >
            <ul className="flex flex-col gap-5 text-base font-medium">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block hover:text-yellow-500" 
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="block font-semibold text-white">Services</span> {/* सफेद टेक्स्ट */}
                <ul className="ml-4 mt-1 space-y-1">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        to={`/services/${service.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm hover:text-yellow-500 text-gray-300" 
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;