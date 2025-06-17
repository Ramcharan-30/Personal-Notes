import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import './navbar-glow.css'; 

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [SearchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (SearchQuery) onSearchNote(SearchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-10 py-4 shadow-xl glowing-navbar border-b">
      <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">📝 My Notes</h2>

      <SearchBar
        value={SearchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
