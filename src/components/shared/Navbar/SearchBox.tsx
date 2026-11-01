// components/navbar/SearchBox.jsx
import React from "react";
import Link from "next/link";

const SearchBox = ({ searchTerm, handleSearch, filteredResults, clearSearch }: any) => {
  return (
    <div className="hidden lg:block relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 rounded-full border border-border-subtle text-text-main font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-accent"
      />
      {searchTerm && (
        <ul className="absolute left-0 mt-2 bg-surface text-text-main rounded-xl shadow-xl w-60 z-50 max-h-60 overflow-auto">
          {filteredResults.length > 0 ? (
            filteredResults.map((result: any) => (
              <li key={result.id}>
                <Link
                  href={`/services/${result.id}`}
                  className="block px-4 py-2 hover:bg-accent hover:text-text-light transition"
                  onClick={clearSearch}
                >
                  {result.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-text-muted">No service found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
