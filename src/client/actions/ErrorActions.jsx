import * as types from './ActionTypes';

const setErrorAction = error => {
  return { type: types.SET_ERROR, error }
}

export const setError = error => {
  return (dispatch) => dispatch(setErrorAction(error));
}
