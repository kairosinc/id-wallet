import React, { Component } from "react";
import { connect } from 'react-redux';

import AccountInfo from './AccountInfo';
import { Success } from './Button';

class PreEnrollment extends React.Component {
  constructor(props) {
    super(props);

    this.callout = this.callout.bind(this);
  }

  callout() {
    return (
        <Success onClick={this.props.handleClick} btnValue="Enroll Wallet" />
    );
  }

  render() {
    return (
      <AccountInfo callout={this.callout} />
    );
  }
}

const mapStateToProps = state => {
  return {
    tokenName: state.configs.TOKEN_NAME
  }
};

export default connect(mapStateToProps)(PreEnrollment);
