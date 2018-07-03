import * as types from './ActionTypes';

export const setToken = token => {
  return { type: types.SET_TOKEN, token };
}

export const getToken = (web3, networkId, TokenArtifact) => {
  const networkData = TokenArtifact.networks[networkId]
  const tokenAddress = networkData && networkData.address;
  const tokenAbi = TokenArtifact.abi;

  let token;
  if (tokenAddress && tokenAbi) {
    token = web3.eth.contract(tokenAbi).at(tokenAddress);
  }

  return token;
}
