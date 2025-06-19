import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div className="text-center mt-10">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
