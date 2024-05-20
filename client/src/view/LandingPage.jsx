import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="landing-page">
      <button onClick={handleClick}>Ingresar a la pagina de todos los corredores</button>
    </div>
  );
};

export default LandingPage;
