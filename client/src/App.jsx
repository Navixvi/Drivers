import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './view/LandingPage';
import Home from './view/Home'; 
import Detail from './view/Detail';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/driver/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
