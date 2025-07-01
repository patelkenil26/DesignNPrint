// components/navbar/SearchBox.jsx
import React from "react";
import { Link } from "react-router-dom";

const SearchBox = ({ searchTerm, handleSearch, filteredResults, clearSearch }) => {
  return (
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
                  onClick={clearSearch}
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
  );
};

export default SearchBox;
