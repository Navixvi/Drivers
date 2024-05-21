import axios from 'axios';
import { FETCH_DRIVERS_SUCCESS } from './action-types';

export const fetchDriversSuccess = (drivers, totalPages) => ({
    type: FETCH_DRIVERS_SUCCESS,
    payload: { drivers, totalPages },
  });
  
  export const fetchAllDrivers = (page) => {
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

