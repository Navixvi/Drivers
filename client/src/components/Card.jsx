import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ driver }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/driver/${driver.id}`);
    };
  
    return (
      <div className="card" onClick={handleClick}>
        <img src={driver.image} alt={driver.name} />
        <h2>{driver.name}</h2>
        <p>{driver.team}</p>
      </div>
    );
  };
  
  export default Card;