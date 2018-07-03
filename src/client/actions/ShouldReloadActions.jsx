import * as types from './ActionTypes';

export const setShouldReload = value => {
  return { type: types.SET_SHOULD_RELOAD, value };
}
