import React from 'react';
import { connect } from 'react-redux';

import InteractionContainer from '../containers/InteractionContainer';
import BalanceContainer from '../containers/BalanceContainer';
import TransactionListContainer from '../containers/TransactionListContainer';

const WalletHome = props => (
  <section>
    <InteractionContainer />
    <ul className="mx-3 nav nav-tabs pt-3 px-3 bg-secondary" id="mainTab" role="tablist">
      <li className="nav-item">
        <a className={ props.noConnection || props.noAccount ? 'nav-link active text-muted' : 'nav-link active'}
           id="balance-tab" data-toggle="tab" href="#balance" role="tab" aria-controls="balance" aria-selected="true">
          Balances
        </a>
      </li>
      <li className="nav-item">
          <a className={ props.noConnection || props.noAccount ? 'nav-link text-muted' : 'nav-link'}
           id="transaction-tab" data-toggle="tab" href="#transaction" role="tab" aria-controls="transaction" aria-selected="false">
          Transactions
        </a>
      </li>
    </ul>
    <div className="mx-3 py-3 tab-content d-flex align-items-center bg-white" id="mainTabContent">
      <div className="tab-pane fade w-100 show active" id="balance" role="tabpanel" aria-labelledby="balance-tab">
          <BalanceContainer />
      </div>
      <div className="tab-pane fade w-100" id="transaction" role="tabpanel" aria-labelledby="transaction-tab">
          <TransactionListContainer />
      </div>
    </div>
  </section>
);

const mapStateToProps = state => {
    return {
        noConnection: state.networkId === 0,
        noAccount: state.account === null,
    }
};

export default connect(mapStateToProps)(WalletHome);
