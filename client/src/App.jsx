import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './view/LandingPage';
import Home from './view/Home'; 
import Detail from './view/Detail';
import CreateForm from './view/CreateForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/driver/:id" element={<Detail />} />     
        <Route path="/driver/create" element={<CreateForm />} />
      </Routes>
    </div>
  );
}

export default App;
