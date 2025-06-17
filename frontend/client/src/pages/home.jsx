import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import NoteCard from '../components/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from '../components/AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 
import moment from "moment";
import Toast from '../components/Toast';
import EmptyCard from '../components/EmptyCard';
import  AddNoteIcon  from '../assets/addNote.svg'
import  NoData  from '../assets/NoData.svg'


const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch,setIsSearch]=useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type = "add") => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });

    setTimeout(() => {
      setShowToastMsg({
        isShown: false,
        message: "",
        type,
      });
    }, 3000);
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Failed to fetch user info:", error);
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const deleteNote = async(data)=>{
    const noteId = data._id
    try {
      const response = await axiosInstance.delete("/delete-note/"+noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Sucessfully",'delete');
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected Error occured.Please Try Again");
      }
    }
  };

  const onSearchNote = async(query) => {
    try {
      const response = await axiosInstance.get("/search-notes",{
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleClearSearch = () =>{
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned =async(noteData)=>{
    const noteId = noteData._id
     try {
      const response = await axiosInstance.put("/update-note-pinned/"+noteId, {
        "isPinned" : !noteData.isPinned
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Sucessfully");
        getAllNotes();
        
      }
    } catch (error) {
     console.log(error)
  }
}
  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

      <div className="container mx-auto">
        {allNotes.length>0 ?(<div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={moment(item.createdOn).format("Do MMM YYYY")}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updateIsPinned(item)}
            />
          ))}
        </div>):(<EmptyCard imgSrc={isSearch?NoData:AddNoteIcon} 
        message={isSearch?"Oops! No Data Matching Your Search":"Start Creating Your First Note! Click The Add Button to start Creating Your Notes"}/>
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-[var(--color-primary)] absolute right-10 bottom-10"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onclose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast 
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
      />
    </>
  );
};

export default Home;
