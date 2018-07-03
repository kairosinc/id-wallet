import * as types from './ActionTypes';

export const setWeb3 = web3 => {
  return { type: types.SET_WEB3, web3 };
}

export const getWeb3 = backupProvider => {
  let provider;
  if (typeof web3 !== 'undefined') {
    provider = web3.currentProvider;
  } else {
    provider = new Web3.providers.HttpProvider(backupProvider);
  }
  return new Web3(provider);
}
