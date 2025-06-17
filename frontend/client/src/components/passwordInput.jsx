import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className='flex items-center border-[1.5px] px-5 py-2 rounded-md mb-4 bg-white shadow-sm'>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent outline-none"
      />
      {isShowPassword ? (
        <FaRegEye
          size={20}
          className="text-[var(--color-primary)] cursor-pointer"
          onClick={() => setIsShowPassword(false)}
        />
      ) : (
        <FaRegEyeSlash
          size={20}
          className="text-slate-400 cursor-pointer"
          onClick={() => setIsShowPassword(true)}
        />
      )}
    </div>
  );
};

export default PasswordInput;
