import { SET_REGISTERED } from '../actions/ActionTypes'

const registered = (state = false, action) => {
  switch (action.type) {
    case SET_REGISTERED: return action.registered;
    default: return state;
  }
}

export default registered;
