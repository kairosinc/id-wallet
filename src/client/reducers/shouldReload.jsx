import { SET_SHOULD_RELOAD } from '../actions/ActionTypes'

const shouldReload = (state = false, action) => {
  switch (action.type) {
    case SET_SHOULD_RELOAD: {
      return action.value;
    }
    default: return state;
  }
}

export default shouldReload;
