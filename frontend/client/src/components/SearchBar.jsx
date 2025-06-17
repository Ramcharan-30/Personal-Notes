import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import './navbar-glow.css'; 

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full shadow-md glowing-navbar w-80">
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full text-sm bg-transparent outline-none placeholder:text-slate-400"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-lg text-gray-400 hover:text-black cursor-pointer"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-gray-400 hover:text-black cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
