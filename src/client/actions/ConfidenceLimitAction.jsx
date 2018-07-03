import * as types from './ActionTypes';
import { fetchConfidenceLimit } from '../utils/signature';

export const setConfidenceLimit = value => {
  return { type: types.SET_CONFIDENCE_LIMIT, value };
}

export const getConfidenceLimit = (url) => {
  return fetchConfidenceLimit(url);
}
