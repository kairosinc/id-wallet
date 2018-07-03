import React from "react";
import { connect } from 'react-redux';

import Balance from "../components/Balance";


class BalanceContainer extends React.Component {
  render() {
    return <Balance currencies={this.props.currencies} />;
  }
}

const mapStateToProps = state => {
  if (state.balance) {
    return {
          currencies: [{
              id: 1,
              currency: state.configs.TOKEN_NAME,
              symbol: state.configs.TOKEN_SYMBOL,
              icon: "circle-notch",
              ratio: 1,
              balance: state.balance
          }]
      }
  }else{
    return { currencies: [] }
  }
};

export default connect(mapStateToProps)(BalanceContainer);