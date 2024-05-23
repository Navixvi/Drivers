import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/driver/create">Crear Conductor</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
