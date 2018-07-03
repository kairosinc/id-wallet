import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Transaction from "./Transaction";
import FilterLink from "../containers/FilterLink";
import { TransactionFilters } from "../actions/TransactionActions";

const TransactionList = props => (
    <div className="pt-2 pb-3">
        { (props.transactions.length > 0 || props.transactionsFilter !== "SHOW_ALL") &&  (
            <div className="d-flex flex-row justify-content-end pr-3 text-uppercase" onClick={props.handleClick}>
                <FilterLink filter={TransactionFilters.SHOW_ALL}>All</FilterLink>
                <FilterLink filter={TransactionFilters.SHOW_SENT}>Sent</FilterLink>
                <FilterLink filter={TransactionFilters.SHOW_RECEIVED}>Received</FilterLink>
            </div>
        )}
        { props.transactions.length > 0 ? (
            <div className="pt-3 px-3">
                <table className="table table-responsive-lg">
                    <thead><tr className="text-uppercase">
                        <th scope="col" className="font-weight-normal">Date</th>
                        <th scope="col" className="font-weight-normal">Block</th>
                        <th scope="col" className="font-weight-normal">Status</th>
                        <th scope="col" className="font-weight-normal">Address</th>
                        <th scope="col" className="font-weight-normal text-right">Amount</th>
                    </tr></thead>
                    <tbody className="border-bottom">
                        {props.transactions.map(tran => {
                            tran.symbol = props.symbol;
                            return tran
                        }).map((tran, index) => (
                            <Transaction key={index} {...tran} />
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
          <div className="text-center pt-3 pb-2 px-4">
                {props.transactionsFilter === "SHOW_ALL"  && ( <span>No transactions found for this wallet</span>)}
                {props.transactionsFilter === "SHOW_SENT"  && ( <span>No sent transactions</span> )}
                {props.transactionsFilter === "SHOW_RECEIVED"  && ( <span>No received transactions</span> )}
          </div>
        )}
    </div>
);

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      hash: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      blockNumber: PropTypes.number.isRequired,
      to: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      verified: PropTypes.bool.isRequired,
      confidence: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

const mapStateToProps = state => {
  return {
    account: state.account,
    transactionsFilter: state.transactionFilter,
    symbol: state.configs.TOKEN_SYMBOL
  };
};

export default connect(mapStateToProps)(TransactionList);
