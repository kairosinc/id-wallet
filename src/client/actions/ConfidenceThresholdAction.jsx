import * as types from './ActionTypes';
import { tokenConfidenceThreshold } from '../utils/EthereumTransactions';

export const setConfidenceThreshold = value => {
  return { type: types.SET_CONFIDENCE_THRESHOLD, value };
}

export const getConfidenceThreshold = token => {
  return tokenConfidenceThreshold(token);
}
