import React, { Component } from "react";

import AccountInfo from './AccountInfo';
import { Success } from './Button';

class PreTransfer extends React.Component {
  constructor(props) {
    super(props);

    this.callout = this.callout.bind(this);
  }

  callout() {
    return (
        <Success onClick={this.props.handleClick} btnValue="Send" />
    )
  };

  render() {
    return (
      <AccountInfo callout={this.callout} />
    );
  }
}

export default PreTransfer;
