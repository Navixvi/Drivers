import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ driver }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
        navigate(`/driver/${driver.id}`);
    };
  
    return (
        <div className="card" onClick={handleClick}>
            <img src={driver.image.url} alt={driver.name.forename + ' ' + driver.name.surname} />
            <h2>{driver.name.forename} {driver.name.surname}</h2>
            <p>{driver.teams}</p>
        </div>
    );
};
  
export default Card;
