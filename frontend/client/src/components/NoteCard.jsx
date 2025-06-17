import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import './navbar-glow.css';

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="rounded-xl p-5 bg-gradient-to-br from-white to-slate-50 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-200 min-w-[260px] max-w-sm space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h6 className="text-lg font-semibold text-gray-900">{title}</h6>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`text-xl cursor-pointer transition-colors ${
            isPinned ? 'text-green-600' : 'text-gray-300'
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-gray-700 line-clamp-4">{content?.slice(0, 100)}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xl">
          <MdCreate
            className="cursor-pointer text-gray-400 hover:text-blue-600 transition-colors"
            onClick={onEdit}
          />
          <MdDelete
            className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
