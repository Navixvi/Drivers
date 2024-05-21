import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDriverById } from '../redux/actions'; 

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector(state => state.selectedDriver); 

  useEffect(() => {
    dispatch(fetchDriverById(id));
  }, [dispatch, id]);

  if (!driver) return <p>Loading...</p>;
  if (driver.error) return <p>Error: {driver.error}</p>;

  return (
    <div className="driver-detail">
      <h1>{driver.name.forename} {driver.name.surname}</h1>
      <img src={driver.image.url} alt={`${driver.name.forename} ${driver.name.surname}`} />
      <p><strong>ID:</strong> {driver.id}</p>
      <p><strong>Nationality:</strong> {driver.nationality}</p>
      <p><strong>Date of Birth:</strong> {driver.dob}</p>
      <p><strong>Teams:</strong> {driver.teams}</p>
      <p><strong>Description:</strong> {driver.description}</p>
    </div>
  );
};

export default Detail;
