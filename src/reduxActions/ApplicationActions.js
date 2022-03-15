import * as actionvariables from '../config/ReduxActionConstants';

//New ActionConstants dispatch
export const getLoginData = () => {
  return {
    type: actionvariables.LOGIN_FETCHING_DATA,
  };
};
export const getLoginDataSuccess = data => {
  return {
    type: actionvariables.LOGIN_FETCHING_DATA_SUCCESS,
    payload: data,
  };
};
export const getLoginDataError = err => {
  return {
    type: actionvariables.LOGIN_FETCHING_DATA_ERROR,
    payload: err,
  };
};

export const logout = () => {
  global.accessToken = undefined;
  return {
    type: actionvariables.LOGOUT,
  };
};
export const logOutData = () => {
  return {
    type: actionvariables.LOGOUT_DATA,
  };
};
export const logOutSuccess = data => {
  return {
    type: actionvariables.LOGOUT_SUCCESS,
    payload: data,
  };
};
export const logOutError = err => {
  return {
    type: actionvariables.LOGOUT_ERROR,
    payload: err,
  };
};