import React from 'react'

import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const routes=(
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/Login" exact element={<Login />} />
      <Route path="/Signup" exact element={<Signup />} />
    </Routes>
  </Router>
)


const App = () => {
  return <>
   {routes}
  </>
  
}

export default App;