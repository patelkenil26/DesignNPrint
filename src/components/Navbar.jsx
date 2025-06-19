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
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
    <nav className="bg-gray-800 text-white font-poppins shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to={"/"}
          className="hover:text-yellow-500 transition-all hover:scale-105"
        >
          <img src={navLogo} alt="Logo" className="w-36 sm:w-44" />
        </Link>

        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={28} color="white" />
          ) : (
            <Menu size={28} color="white" />
          )}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-8 items-center text-base font-medium tracking-wide">
          {[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/about" },
            { label: "Contact", to: "/contact" },
          ].map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="hover:text-yellow-500 transition duration-200"
              >
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 w-52 z-50 shadow-xl rounded-xl bg-white overflow-hidden"
                >
                  <ul className="max-h-72 overflow-y-auto text-blue-900 scrollbar-thin scrollbar-thumb-gray-400">
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
                  </ul>
                </motion.div>
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
          {searchTerm && (
            <ul className="absolute left-0 mt-2 bg-white text-black rounded-xl shadow-xl w-60 z-50 max-h-60 overflow-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <li key={result.id}>
                    <Link
                      to={`/services/${result.id}`}
                      className="block px-4 py-2 hover:bg-yellow-500 hover:text-white transition"
                      onClick={() => setSearchTerm("")}
                    >
                      {result.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No service found</li>
              )}
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
            className="lg:hidden bg-gray-700 px-4 py-4 shadow-inner"
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

              {/* Services Toggle */}
              <li>
                <span
                  className="block font-semibold text-white cursor-pointer"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services {isServicesOpen ? "▲" : "▼"}
                </span>

                {/* Show grid layout if open */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="columns-2 gap-4 mt-6"
                    >
                      {services
                        
                        .map((service) => (
                          <li key={service.id} className="break-inside-avoid mb-4">
                            <Link
                              to={`/services/${service.id}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsServicesOpen(false);
                              }}
                              className="block text-sm text-gray-300 hover:text-yellow-500"
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
          </motion.div>
        )}
      </AnimatePresence>

       {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://wa.me/919725281074"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        title="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M12.003 2.001C6.478 2.001 2 6.48 2 12.003c0 1.993.521 3.883 1.506 5.566L2 22l4.558-1.486A9.96 9.96 0 0012.003 22C17.527 22 22 17.522 22 12.003 22 6.48 17.527 2.001 12.003 2.001zm0 18.001a7.95 7.95 0 01-4.245-1.24l-.305-.184-2.705.882.9-2.633-.198-.313A7.944 7.944 0 014.003 12c0-4.415 3.584-8 8-8 4.416 0 8 3.585 8 8 0 4.416-3.584 8.002-8 8.002zm4.396-5.81c-.24-.12-1.418-.699-1.639-.778-.219-.08-.379-.12-.538.12s-.619.778-.76.94c-.139.16-.279.179-.518.06-.24-.12-1.014-.374-1.93-1.192-.713-.636-1.194-1.42-1.335-1.659-.14-.239-.015-.368.104-.488.107-.106.239-.279.359-.419.12-.14.16-.24.24-.399.08-.16.04-.299-.02-.419-.06-.12-.538-1.298-.738-1.779-.199-.48-.4-.42-.538-.42h-.459c-.14 0-.36.06-.548.28-.187.22-.719.7-.719 1.698s.737 1.971.839 2.108c.1.14 1.453 2.219 3.521 3.109.492.212.875.338 1.173.432.492.157.94.135 1.294.082.395-.058 1.418-.578 1.618-1.136.2-.558.2-1.037.14-1.136-.06-.1-.219-.16-.459-.279z" />
        </svg>
      </a>
    </nav>
  );
};

export default Navbar;
