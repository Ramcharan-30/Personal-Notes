import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addNewTag = () => {
    const trimmedTag = inputValue.trim();
    if (trimmedTag !== "" && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addNewTag();
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-sky-100 px-3 py-1 rounded-full text-sm text-sky-700 font-medium shadow"
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Add tag"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="text-sm px-4 py-2 border rounded-lg shadow-sm outline-none w-full"
        />
        <button
          className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
          onClick={addNewTag}
        >
          <MdAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
