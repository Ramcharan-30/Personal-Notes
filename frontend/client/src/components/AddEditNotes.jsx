import React, { useState } from 'react'
import TagInput from './TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onclose , showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Sucessfully");
        getAllNotes();
        onclose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id
     try {
      const response = await axiosInstance.put("/edit-note/"+noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Sucessfully");
        getAllNotes();
        onclose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please Enter The Title");
      return;
    }

    if (!content) {
      setError("Please Enter Content");
      return;
    }

    setError(null);

    if (type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className='relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl mx-auto'>
      <button
        className='w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-slate-100 transition duration-200'
        onClick={onclose}
      >
        <MdClose className='text-xl text-slate-500' />
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-slate-700">
        {type === 'edit' ? 'Edit Note' : 'Add a New Note'}
      </h2>

      <div className='flex flex-col gap-1 mb-4'>
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Title</label>
        <input
          type="text"
          className="text-xl font-semibold text-slate-900 p-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder='Add Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-1 mb-4'>
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">Content</label>
        <textarea
          className='text-sm text-slate-900 bg-slate-50 p-3 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300'
          placeholder='Write your note here...'
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <label className='text-xs font-medium text-slate-600 uppercase tracking-wide'>Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-sm pt-2">{error}</p>}

      <button
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'Update Note' : 'Add Note'}
      </button>
    </div>
  );
};

export default AddEditNotes;
