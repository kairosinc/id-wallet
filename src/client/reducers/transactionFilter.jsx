import { SET_TRANSACTION_FILTER } from '../actions/ActionTypes'

function transactionFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case SET_TRANSACTION_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default transactionFilter;