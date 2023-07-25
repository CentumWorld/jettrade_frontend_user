import React from 'react';

const CryptoSearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search cryptocurrency"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default CryptoSearchBar;
