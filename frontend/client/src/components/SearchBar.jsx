import React from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6"
import {IoMdClose} from "react-icons/io"
import './navbar-glow.css'; 

const SearchBar = ({ value ,onChange ,handleSearch ,onClearSearch }) => {
  return (
    <div className="w-76 flex items-center px-4 bg-slate-100 rounded-md glowing-navbar">
        <input 
         type="text" 
         placeholder="Search Notes"
         className="w-full text-xs bg-transparent py-[11px] outline-none"
         value={value}
         onChange={onChange}
         
         />

         {value && <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch}/>}

         <FaMagnifyingGlass  className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar