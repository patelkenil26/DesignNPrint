// components/navbar/Logo.jsx
import React from "react";
import { Link } from "react-router-dom";
import navLogo from "../../images/Logo/DesignNPrint.png";

const Logo = () => {
  return (
    <Link to="/" className="hover:text-yellow-500 transition-all hover:scale-105">
      <img src={navLogo} alt="Logo" className="w-36 sm:w-44" />
    </Link>
  );
};

export default Logo;
