import * as actionvariables from '../config/ReduxActionConstants';
const initialState = {
  data: undefined,
  isFetching: false,
  error: false,
};
const LoginReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionvariables.LOGOUT:
      return {
        ...state,
        data: undefined,
        errordata: undefined,
        isFetching: false,
        error: false,
      };
    case actionvariables.LOGIN_FETCHING_DATA:
      return {
        ...state,
        data: undefined,
        errordata: undefined,
        isFetching: true,
        error: false,
      };
    case actionvariables.LOGIN_FETCHING_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        errordata: undefined,
        isFetching: false,
        error: false,
      };
    case actionvariables.LOGIN_FETCHING_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        data: undefined,
        errordata: {...action.payload},
        error: true,
      };
    default:
      return state;
  }
};
export default LoginReducers;
