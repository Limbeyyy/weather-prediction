import React, { useState } from 'react'
import Navigationbar from './components/Home/Navigationbar'
import "./App.css";
import Menu from './components/Home/Menu';
import { Routes, Route } from 'react-router-dom';
import Performance from './components/Peformance/Performance';
import Result from './components/Analysis/Result';
import LoginPage from './components/Home/Login/LoginPage';
import SignupPage from './components/Home/Signup/SignInPage';
import About from './components/About/About';
import Form from './components/Home/Form';
import Menus from './components/Home/Menus';


const App = () => {
  const [model, setModel] = useState('')
  const [location, setLocation] = useState('')

  return (
    <div className='container'>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<About />} exec />
        <Route path="/menus" element={<Menu model={model} location={location} />} exec />
        <Route path="/menuss" element={<Menus setModel={setModel} setLocation={setLocation} model={model} location={location} />} exec />
        <Route path="/performance" element={<Performance />} />
        <Route path="/analysis" element={<Result />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<Form />}></Route>
        <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </div>
  )
}

export default App