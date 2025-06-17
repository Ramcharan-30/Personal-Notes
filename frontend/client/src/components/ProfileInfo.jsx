import React from 'react';
import { getInitials } from '../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-800 font-semibold shadow-sm">
        {getInitials(userInfo.fullName)}
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-gray-700">{userInfo.fullName}</p>
        <button
          className="text-xs text-red-500 hover:text-red-600 underline transition"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
