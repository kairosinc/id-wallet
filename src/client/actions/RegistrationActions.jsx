import * as types from './ActionTypes';

export const setRegistration = registered => {
  return { type: types.SET_REGISTERED, registered }
}

export const getRegistration = (token, account) => {
  return new Promise((resolve, reject) => {
    token.registrations(account, (error, registration) => {
      const registeredIndex = 3;
      if (error) reject(error);
      else resolve(registration[registeredIndex]);
    });
  });
}

export const registrationListener = (dispatch, token, account) => {
  token.RegisterUser({ sender: account }, (error, result) => {
    if (error) console.error(error);
    else dispatch(setRegistration(result.args.success))
  });
};
