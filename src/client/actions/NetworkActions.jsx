import * as types from './ActionTypes';

export const setNetworkId = networkId => {
  return { type: types.SET_NETWORKID, networkId };
}

export const getNetworkId = web3 => {
  return new Promise((resolve, reject) => {
    return web3.version.getNetwork((error, networkId) => {
      if (error) reject(error);
      else resolve(networkId);
    });
  });
}
