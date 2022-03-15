import * as actionvariables from '../config/ReduxActionConstants';
const initialState = {
  data: undefined,
  isFetching: false,
  error: false,
};
const LogoutReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionvariables.LOGOUT:
      return {
        ...state,
        data: undefined,
        errordata: undefined,
        isFetching: false,
        error: false,
      };
    case actionvariables.LOGOUT_DATA:
      return {
        ...state,
        data: undefined,
        errordata: undefined,
        isFetching: true,
        error: false,
      };
    case actionvariables.LOGOUT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        errordata: undefined,
        isFetching: false,
        error: false,
      };
    case actionvariables.LOGOUT_ERROR:
      return {
        ...state,
        isFetching: false,
        data: undefined,
        errordata: action.payload,
        error: true,
      };
    default:
      return state;
  }
};
export default LogoutReducers;
