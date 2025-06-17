import React from 'react';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <img src={imgSrc} alt="No Notes" className="w-64 drop-shadow-md" />
      <p className="w-3/5 text-base font-medium text-slate-700 text-center leading-7 mt-6">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
