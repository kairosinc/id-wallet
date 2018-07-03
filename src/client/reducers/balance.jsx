import { SET_BALANCE } from '../actions/ActionTypes';

import BigNumber from 'bignumber.js';

const balance = (state = 0, action) => {
  switch (action.type) {
    case SET_BALANCE: {
      const decimals = new BigNumber(10).exponentiatedBy(18);
      const smallValue = action.balance.dividedBy(decimals).toNumber();
      return smallValue;
    }
    default: return state;
  }
}

export default balance;
