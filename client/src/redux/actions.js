import axios from 'axios';
import { FETCH_DRIVERS_SUCCESS, FETCH_DRIVER_SUCCESS } from './action-types';

// Acción para manejar el éxito de la obtención de todos los conductores
export const fetchDriversSuccess = (drivers, totalPages) => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload: { drivers, totalPages },
});

// Acción para manejar el éxito de la obtención de un conductor por ID
export const fetchDriverSuccess = (driver) => ({
  type: FETCH_DRIVER_SUCCESS,
  payload: driver,
});

// Acción para obtener todos los conductores con paginación
export const fetchAllDrivers = (page = 1) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/drivers?page=${page}`);
      const { drivers, totalPages } = response.data;
      dispatch(fetchDriversSuccess(drivers, totalPages));
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };
};

// Acción para obtener un conductor por ID
export const fetchDriverById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/drivers/${id}`);
      dispatch(fetchDriverSuccess(response.data));
    } catch (error) {
      console.error('Error fetching driver:', error);
    }
  };
};

export const createDriver = (driverData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/drivers', driverData);
    console.log('Driver created successfully:', response.data);
  } catch (error) {
    console.error('Error creating driver:', error);
  }
};