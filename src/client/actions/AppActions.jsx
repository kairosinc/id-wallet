import KairosIdentityToken from '../../../build/contracts/KairosIdentityToken.json';

import { setShouldReload } from './ShouldReloadActions';
import { setConfigs } from './ConfigActions';
import { getWeb3, setWeb3 } from './Web3Actions';
import { getNetworkId, setNetworkId } from './NetworkActions';
import { getToken, setToken } from './TokenActions';
import { getConfidenceLimit, setConfidenceLimit } from './ConfidenceLimitAction';
import { getConfidenceThreshold, setConfidenceThreshold } from './ConfidenceThresholdAction';
import { getBalance, setBalance } from './BalanceActions';
import { getAccount, setAccount, accountListener } from './AccountActions';
import { getRegistration, setRegistration, registrationListener } from './RegistrationActions';
import { getTransactions, setTransactions, transactionListener } from './TransactionActions';

const getConfigData = (configs) => {
  let preState = {};

  return Promise.all([
    preState,
    getWeb3(configs.BACKUP_PROVIDER),
    getConfidenceLimit(configs.ROOT_URL)
  ]);
}

const getEnvironmentData = (data) => {
  let preState = data[0];
  preState.web3 = data[1];
  preState.confidenceLimit = data[2];

  return Promise.all([
    preState,
    getAccount(preState.web3),
    getNetworkId(preState.web3)
  ]);
}

const getTokenData = (data) => {
  let preState = data[0];
  preState.account = data[1];
  preState.networkId = data[2];

  return Promise.all([
    preState,
    getToken(preState.web3, preState.networkId, KairosIdentityToken)
  ]);
}

const getUserContractData = (data) => {
  let preState = data[0];
  preState.token = data[1];

  return Promise.all([
    preState,
    getConfidenceThreshold(preState.token),
    getBalance(preState.token, preState.account),
    getRegistration(preState.token, preState.account),
    getTransactions(preState.web3, preState.token, preState.account, preState.confidenceLimit)
  ]);
}

const saveItUp = (data) => {
  let preState = data[0];
  preState.confidenceThreshold = data[1];
  preState.balance = data[2];
  preState.registration = data[3];
  preState.transactions = data[4];

  return preState;
}

const getStateData = (configs) => {
  return getConfigData(configs)
    .then(getEnvironmentData)
    .then(getTokenData)
    .then(getUserContractData)
    .then(saveItUp);
}

const applyState = (dispatch, preState) => {
  let { web3, account, networkId, token, confidenceLimit,
    confidenceThreshold, balance, registration, transactions } = preState;
  dispatch(setWeb3(web3));
  dispatch(setAccount(account));
  dispatch(setNetworkId(networkId));
  dispatch(setToken(token));
  dispatch(setConfidenceLimit(confidenceLimit));
  dispatch(setConfidenceThreshold(confidenceThreshold));
  dispatch(setBalance(balance));
  dispatch(setRegistration(registration));
  dispatch(setTransactions(transactions));
}

const startListeners = (dispatch, getState) => {
  const { web3, token, account, confidenceLimit } = getState();
  return Promise.all([
    accountListener(dispatch, web3, token, account, setShouldReload),
    registrationListener(dispatch, token, account),
    transactionListener(dispatch, web3, token, account, confidenceLimit, getBalance, setBalance)
  ]);
};

export const setupApp = (configs) => {
  return (dispatch, getState) => {
    dispatch(setConfigs(configs));
    return getStateData(configs)
      .then(preState => applyState(dispatch, preState))
      .then(() => startListeners(dispatch, getState))
      .catch(error => console.error(error));
  }
};
