// components/navbar/Navbar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SearchBox from "./SearchBox";
import WhatsAppButton from "./WhatsAppButton";
import { services } from "../../data/servicesData";

const Navbar = () => {
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
        <Logo />
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <DesktopMenu />
        <SearchBox
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          filteredResults={filteredResults}
          clearSearch={() => setSearchTerm("")}
        />
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        toggle={() => setIsMobileMenuOpen(false)}
        serviceOpen={isServicesOpen}
        toggleServices={() => setIsServicesOpen(!isServicesOpen)}
      />

      <WhatsAppButton />
    </nav>
  );
};

export default Navbar;
