import axios from 'axios';
import { FETCH_DRIVERS_SUCCESS, FETCH_DRIVER_SUCCESS, FETCH_NATIONALITIES_SUCCESS } from './action-types';

// Acción para manejar el éxito de la obtención de todos los conductores
export const fetchDriversSuccess = (drivers, totalPages) => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload: { drivers, totalPages },
});

// Acción para manejar el éxito de la obtención de las nacionalidades
export const fetchNationalitiesSuccess = (nationalities) => ({
  type: FETCH_NATIONALITIES_SUCCESS,
  payload: nationalities,
});

// Acción para manejar el éxito de la obtención de un conductor por ID
export const fetchDriverSuccess = (driver) => ({
  type: FETCH_DRIVER_SUCCESS,
  payload: driver,
});

// Acción para obtener todos los conductores con paginación
export const fetchAllDrivers = (page = 1, team = '', source = '', nationality = '') => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/drivers', {
        params: { page, team, source, nationality },
      });
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

// Acción para crear un nuevo conductor
export const createDriver = (driverData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/drivers', driverData);
    console.log('Driver created successfully:', response.data);
    // Opcionalmente, podrías despachar otra acción aquí para actualizar el estado de la aplicación después de crear el conductor.
  } catch (error) {
    console.error('Error creating driver:', error);
  }
};

// Acción para obtener equipos
export const fetchTeams = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/teams');
      dispatch(fetchTeamsSuccess(response.data));
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };
};

// Acción para obtener las nacionalidades
export const fetchNationalities = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/nationalities');
      dispatch(fetchNationalitiesSuccess(response.data));
    } catch (error) {
      console.error('Error fetching nationalities:', error);
    }
  };
};
