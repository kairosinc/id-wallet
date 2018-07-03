import { combineReducers } from 'redux';

import account from './account';
import balance from './balance';
import confidenceLimit from './confidenceLimit';
import confidenceThreshold from './confidenceThreshold';
import configs from './configs';
import networkId from './networkId';
import registered from './registered';
import shouldReload from './shouldReload';
import token from './token';
import transactions from './transactions';
import transactionFilter from './transactionFilter';
import web3 from './web3';
import error from './error';

const wallet = combineReducers({
  configs,
  web3,
  account,
  token,
  networkId,
  balance,
  confidenceLimit,
  confidenceThreshold,
  transactions,
  transactionFilter,
  registered,
  shouldReload,
  error
})

export default wallet;