import React from 'react';
import { connect } from 'react-redux';

import TransactionList from '../components/TransactionList';
import PaginationNav from "../components/PaginationNav";
import PaginationSize from "../components/PaginationSize";


class TransactionListContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            txsPerPage: 10,
            paginationStyle: "SHOW_MORE",
            paginationSize: false
        };

        this.updateCurrentPage = this.updateCurrentPage.bind(this);
        this.resetPagination = this.resetPagination.bind(this);
        this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
        this.getDisplayedTxs = this.getDisplayedTxs.bind(this);
    }

    getPageNumbers() {
        const { txsPerPage } = this.state;
        const { transactions } = this.props;

        if (txsPerPage == "All") {
            return [1];
        } else {
            const numberOfPages = Math.ceil(transactions.length / txsPerPage);
            return Array.from(Array(numberOfPages).keys()).map(key => key + 1);
        }
    }

    getDisplayedTxs() {
        const { currentPage, txsPerPage, paginationStyle } = this.state;
        const { transactions } = this.props;

        if (txsPerPage == "All") {
            return transactions;
        } else if (paginationStyle === "SHOW_MORE") {
            const indexOfLastTx = currentPage * txsPerPage;
            const indexOfFirstTx = 0;

            return transactions.slice(indexOfFirstTx, indexOfLastTx);
        } else {
            const indexOfLastTx = currentPage * txsPerPage;
            const indexOfFirstTx = indexOfLastTx - txsPerPage;

            return transactions.slice(indexOfFirstTx, indexOfLastTx);
        }
    }

    updateCurrentPage(event) {
        this.setState({
            currentPage: Number(event.currentTarget.dataset.pagenumber)
        });
    }

    resetPagination(event) {
        this.setState({
            currentPage: 1
        });
    }

    changeItemsPerPage(event) {
        this.setState({
            txsPerPage: event.target.value,
            currentPage: 1
        });
    }

    render() {
        const { currentPage, txsPerPage, paginationStyle } = this.state;
        const { transactions, hasAccount } = this.props;

        return !hasAccount ? (
            <div className="pt-2 pb-3">
                <div className="d-flex flex-row justify-content-end pr-4 text-uppercase text-secondary">
                    <span className="bg-secondary p-1">XXX</span>
                    <span className="bg-secondary p-1">XXXX</span>
                    <span className="bg-secondary p-1">XXXXXXXX</span>
                </div>
                <div className="pt-2 px-3">
                    <table className="w-100 text-secondary table-responsive-lg">
                        <thead className="border border-top-0 border-left-0 border-right-0"><tr className="px-3">
                            <td className="pb-1 pl-2"><span className="bg-secondary py-1">DATE</span></td>
                            <td className="pb-1"><span className="bg-secondary py-1">BLOCK</span></td>
                            <td className="pb-1"><span className="bg-secondary py-1">STATUS</span></td>
                            <td className="pb-1"><span className="bg-secondary py-1">ADDRESS</span></td>
                            <td className="text-right pb-1 pr-2"><span className="bg-secondary py-1">AMOUNT</span></td>
                        </tr></thead>
                        <tbody className="border border-top-0 border-left-0 border-right-0"><tr className="px-3">
                            <td className="py-2 pl-2"><span className="bg-secondary py-1">XX XXX XXXX</span></td>
                            <td className="py-2"><span className="bg-secondary py-1">XXXXXXX</span></td>
                            <td className="py-2"><span className="bg-secondary py-1">XXXX</span></td>
                            <td className="py-2"><span className="bg-secondary py-1">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span></td>
                            <td className="py-2 pr-2 text-right"><span className="bg-secondary py-1">000,000 XX</span></td>
                        </tr></tbody>
                    </table>
                </div>
            </div>
        ) : (
            <section className="TransactionListContainer">
                <TransactionList transactions={this.getDisplayedTxs()} handleClick={this.resetPagination} />

                {transactions.length > 10 && (
                <div className="d-flex flew-row flex-wrap px-3 pb-3 align-items-center">
                    <PaginationNav
                        pageNumbers={this.getPageNumbers()}
                        handleClick={this.updateCurrentPage}
                        currentPage={currentPage}
                        navStyle={paginationStyle}
                    />
                    {this.state.paginationSize && <PaginationSize
                        changeItemsPerPage={this.changeItemsPerPage}
                        selected={txsPerPage}
                    />}
                </div>
                )}
            </section>
        )
    }
}

const getTxsByFilter = (transactions, filter) => {
    switch (filter) {
        case "SHOW_ALL":
            return transactions;
        case "SHOW_SENT":
            return transactions.filter(t => t.type === "Sent");
        case "SHOW_RECEIVED":
            return transactions.filter(t => t.type === "Received");
        default:
            throw new Error("Unknown filter: " + filter)
    }
};

const mapStateToProps = state => {
    return {
        transactions: getTxsByFilter(state.transactions, state.transactionFilter),
        hasAccount: state.account !== null
    };
};


export default connect(mapStateToProps)(TransactionListContainer);