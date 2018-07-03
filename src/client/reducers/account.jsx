import { SET_ACCOUNT } from '../actions/ActionTypes'

const account = (state = null, action) => {
  switch (action.type) {
    case SET_ACCOUNT: return action.account || state;
    default: return state;
  }
}

export default account;
