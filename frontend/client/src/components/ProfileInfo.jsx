import React from 'react'
import { getInitials } from '../utils/helper'


const ProfileInfo = ({onLogout}) => {
  return (
    <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-black font-medium bg-slate-100 ">{getInitials("Name hi")}</div>
            <div>
             <p className="text-sm  text-gray-800 font-medium">Name</p>
             <button className="text-sm text-gray-800 underline" onClick={onLogout}>
              Logout  
            </button> 
            </div>
       
    </div>
  )
}

export default ProfileInfo