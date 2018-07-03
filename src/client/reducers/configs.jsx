import { SET_CONFIGS } from '../actions/ActionTypes';

const configs = (state = {}, action) => {
  switch (action.type) {
    case SET_CONFIGS: {
      return action.value;
    }
    default: return state;
  }
}

export default configs;
