import * as types from './ActionTypes';

export const setConfigs = configs => {
  return { type: types.SET_CONFIGS, value: configs };
}
