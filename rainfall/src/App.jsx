import React from 'react'
import Navigationbar from './components/Home/Navigationbar'
import "./App.css";
import Menu from './components/Home/Menu';
import { Routes, Route } from 'react-router-dom';
import Performance from './components/Peformance/Performance';
import Result from './components/Analysis/Result';
import LoginPage from './components/Home/Login/LoginPage';
import SignupPage from './components/Home/Signup/SignInPage';


const App = () => {
  return (
    <div className='container'>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Menu />} exec />
        <Route path="/performance" element={<Performance />} />
        <Route path="/analysis" element={<Result />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </div>
  )
}

export default App