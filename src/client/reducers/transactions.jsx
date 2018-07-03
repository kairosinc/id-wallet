import { SET_TRANSACTIONS } from '../actions/ActionTypes'

const transactions = (state = [], action) => {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return action.payload;
        default:
            return state;
    }
};

export default transactions;
