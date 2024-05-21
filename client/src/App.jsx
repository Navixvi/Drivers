import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './view/LandingPage';
import Home from './view/Home'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </div>
  );
}

export default App;
