import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Detail from './components/Detail';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home/>} />
          <Route path='/detail/:id' element={<Detail/>} />
          {/* <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
