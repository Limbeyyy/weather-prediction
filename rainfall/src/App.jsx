import React from 'react'
import Navigationbar from './components/Home/Navigationbar'
import "./App.css";
import Menu from './components/Home/Menu';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='container'>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Menu />} exec />
        {/* <Route path="/models" element={<About />} exec />
        <Route path="/Performance" element={<LoginPage />} /> */}
      </Routes>
    </div>
  )
}

export default App