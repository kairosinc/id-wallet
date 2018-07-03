import { SET_CONFIDENCE_THRESHOLD } from '../actions/ActionTypes';

const confidenceThreshold = (state = 0, action) => {
  switch (action.type) {
    case SET_CONFIDENCE_THRESHOLD: {
      return action.value;
    }
    default: return state;
  }
}

export default confidenceThreshold;
