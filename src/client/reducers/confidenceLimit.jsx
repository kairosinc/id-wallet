import BigNumber from 'bignumber.js';

import { SET_CONFIDENCE_LIMIT } from '../actions/ActionTypes';

const confidenceLimit = (state = 0, action) => {
  switch (action.type) {
    case SET_CONFIDENCE_LIMIT: {
      return new BigNumber(action.value);
    }
    default: return state;
  }
}

export default confidenceLimit;
