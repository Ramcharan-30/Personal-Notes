import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo';
import {useNavigate} from "react-router-dom"
import SearchBar from './SearchBar';
import './navbar-glow.css'; 


const Navbar = () => {

  const [SearchQuery,setSearchQuery] = useState("")

  const navigate = useNavigate()

  const onLogout = ()=>{
    navigate("/login")
  }

  const handleSearch= () =>{

  }

  const onClearSearch = () =>{
    setSearchQuery("")
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow glowing-navbar'>
        <h2 className="text-xl font-medium text-grey-800 py-2">My Notes</h2>

        <SearchBar 
         value={SearchQuery} 
          onChange={(e)=>{
            setSearchQuery(e.target.value)
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
         />

        <ProfileInfo onLogout={onLogout} />
    </div>
  )
}

export default Navbar;