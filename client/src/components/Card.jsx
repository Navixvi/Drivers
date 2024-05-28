import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ driver }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/driver/${driver.id}`);
  };

  // Verifica si driver y los campos necesarios están definidos
  if (!driver || !driver.name || !driver.image) {
    return null; // o algún renderizado de fallback
  }

  // Obtener la lista de equipos del driver
  let teams = [];

  // Verifica si driver.Teams es un array (para los datos de la base de datos)
  if (Array.isArray(driver.Teams)) {
    teams = driver.Teams.map(team => team.name);
  } else if (Array.isArray(driver.teams)) {
    // Verifica si driver.teams es un array (para compatibilidad)
    teams = driver.teams.map(team => team.name);
  } else if (typeof driver.teams === 'string') {
    // Verifica si driver.teams es una cadena (para los datos de la API)
    teams = driver.teams.split(',').map(team => team.trim());
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={driver.image.url ? driver.image.url : driver.image} alt={`${driver.name.forename || driver.name} ${driver.name.surname || driver.lastName}`} />
      <h2>{`${driver.name.forename || driver.name} ${driver.name.surname || driver.lastName}`}</h2>
      <p>Teams:</p>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
