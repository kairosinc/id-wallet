import * as types from './ActionTypes';

export const setBalance = balance => {
  return { type: types.SET_BALANCE, balance }
}

export const getBalance = (token, account) => {
  return new Promise((resolve, reject) => {
    token.balanceOf(account, (error, balance) => {
      if (error) reject(error);
      else resolve(balance);
    });
  });
}
