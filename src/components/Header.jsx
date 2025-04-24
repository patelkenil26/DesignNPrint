import React from "react";

const Header = () => {
  return (
    <div className="bg-gray-100 py-2 px-4 flex flex-wrap justify-between items-center text-sm">
      <div className="flex items-center space-x-4">
        <p className="flex items-center">
          <span className="material-icons text-yellow-500 mr-1">place</span>
          Behind Hotel Satluj, N.H No 8, Opposite Bhagat Petrol, Naroda, Ahmedabad 382446, India
        </p>
        <p className="hidden md:flex items-center">
          <span className="material-icons text-yellow-500 mr-1">mail</span>
          work.modernprinters@gmail.com
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <p className="flex items-center">
          <span className="material-icons text-yellow-500 mr-1">phone</span>
          +91 70 48 50 1999, +91 98 24 99 1999
        </p>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">Get a Quote</button>
      </div>
    </div>
  );
};

export default Header;
