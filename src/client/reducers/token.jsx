import { SET_TOKEN } from '../actions/ActionTypes'

const token = (state = null, action) => {
  switch (action.type) {
    case SET_TOKEN: return action.token || state;
    default: return state;
  }
}

export default token;
