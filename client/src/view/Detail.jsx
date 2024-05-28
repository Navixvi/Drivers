import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDriverById } from '../redux/actions'; 
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector(state => state.selectedDriver); 
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home');
  };

  useEffect(() => {
    dispatch(fetchDriverById(id));
  }, [dispatch, id]);
  
  if (!driver) return <p className="loading">Loading...</p>;
  if (driver.error) return <p className="error">Error: {driver.error}</p>;

  const imageUrl = driver.image?.url || driver.image;
  const name = driver.name?.forename && driver.name?.surname ? `${driver.name.forename} ${driver.name.surname}` : `${driver.name} ${driver.lastName}`;
  const dob = driver.dob || driver.birthDate;
  const teams = Array.isArray(driver.teams) ? driver.teams.join(', ') : driver.teams;

  return (
    <div className="driver-detail">
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} />
      <p><strong>ID:</strong> {driver.id}</p>
      <p><strong>Nationality:</strong> {driver.nationality}</p>
      <p><strong>Date of Birth:</strong> {dob}</p>
      <p><strong>Teams:</strong> {teams}</p>
      <p><strong>Description:</strong> {driver.description}</p>
      <button onClick={handleClick}>Volver a Home</button>
    </div>
  );
};

export default Detail;
