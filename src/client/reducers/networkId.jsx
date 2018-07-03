import { SET_NETWORKID } from '../actions/ActionTypes'

const networkId = (state = 0, action) => {
  switch (action.type) {
    case SET_NETWORKID: return action.networkId;
    default: return state;
  }
}

export default networkId;
