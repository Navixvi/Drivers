import { FETCH_DRIVERS_SUCCESS, FETCH_DRIVER_SUCCESS, FETCH_DRIVER_FAILURE } from './action-types';

const initialState = {
  drivers: [],
  selectedDriver: null,
  loading: false,
  error: null,
};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: action.payload,
      };
    case FETCH_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedDriver: action.payload,
      };
    case FETCH_DRIVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default driverReducer;