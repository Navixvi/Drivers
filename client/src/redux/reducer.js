import { FETCH_DRIVERS_SUCCESS } from './action-types';

const initialState = {
  drivers: [],
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
    default:
      return state;
  }
};

export default driverReducer;
