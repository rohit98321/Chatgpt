import React from 'react'
import {Routes, Route } from "react-router-dom";
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Mainroutes = () => {
  return (
    <Routes>
        <Route path="/createchat" element={<Chat/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
      </Routes>
  )
}

export default Mainroutes