import React from 'react';

import PreTransfer from './PreTransfer';
import CaptureTransfer from './CaptureTransfer';
import ConfirmTransaction from './ConfirmTransaction';

class NewTransaction extends React.Component {

  constructor(props) {
    super(props);

    this.SHOULD_TRANSFER = "SHOULD_TRANSFER";
    this.IS_TRANSFERRING = "IS_TRANSFERRING";
    this.DID_TRANSFER = "DID_TRANSFER";

    this.startTransfer = this.startTransfer.bind(this);
    this.finishTransfer = this.finishTransfer.bind(this);
    this.closeTransfer = this.closeTransfer.bind(this);

    this.state = {
      transferStep: this.SHOULD_TRANSFER,
      transferTx: null
    }
  }

  startTransfer() {
    this.setState({
      transferStep: this.IS_TRANSFERRING
    });
  }

  finishTransfer(tx) {
    this.setState({
      transferTx: tx,
      transferStep: this.DID_TRANSFER
    });
  }

  closeTransfer(event) {
    event.preventDefault();
    window.jQuery("#confirmationModal").modal('hide');
    this.setState({
      transferStep: this.SHOULD_TRANSFER
    });
  }

  confirmationMessage() {
    return (
      <div className="d-flex flex-column align-items-center">
        <h3>Success! Transaction sent</h3>
      </div>
    )
  }

  render() {
    if (this.state.transferStep === this.SHOULD_TRANSFER) {
      return (
        <PreTransfer handleClick={this.startTransfer} />
      );
    } else if (this.state.transferStep === this.IS_TRANSFERRING) {
      return (
        <div>
          <PreTransfer handleClick={this.startTransfer} />
          <CaptureTransfer handleVerification={this.finishTransfer} handleClose={this.closeTransfer} />
        </div>
      );
    } else if (this.state.transferStep === this.DID_TRANSFER) {
      return (
          <div>
            <PreTransfer handleClick={this.startTransfer} />
            <ConfirmTransaction
              tx={this.state.transferTx}
              handleClick={this.closeTransfer}
              message={this.confirmationMessage}
            />
          </div>
      );
    } else return null;
  }
}

export default NewTransaction;
