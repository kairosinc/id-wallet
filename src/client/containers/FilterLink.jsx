import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as TransactionActions from '../actions/TransactionActions';

const FilterLink = ({ active, children, actions, filter }) => {
  return <a
    className={active ? "text-success active p-2 font-weight-bold cursor-pointer" : "text-primary p-2 cursor-pointer"}
    aria-pressed={active}
    onClick={() => actions.setTransactionFilter(filter)}
  >
    {children}
  </a>
}

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.transactionFilter
})

const actionCreators = dispatch => ({
  actions: bindActionCreators(TransactionActions, dispatch)
});

export default connect(mapStateToProps, actionCreators)(FilterLink)