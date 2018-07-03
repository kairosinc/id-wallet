import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';

import FaceDetect from '../components/FaceCapture';
import TransferForm from '../components/TransferForm';
import DisplayError from './DisplayError';

import { tokenVerificationAndTransfer } from '../utils/EthereumTransactions'
import { fetchSignature, ensureConfidenceMet } from '../utils/signature';

import * as ErrorActions from '../actions/ErrorActions';

class CaptureTransfer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toAddress: "",
      amount: 0,
      formSubmitted: false,
      transactionSent: false
    }

    this.verifyImage = this.verifyImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  verifyImage(imageData) {
    const { toAddress, amount } = this.state;
    const { account, token, confidenceThreshold, handleVerification, configs } = this.props;
    const { ROOT_URL, VERIFY_ROUTE, APP_ID, APP_KEY, GALLERY_NAME } = configs;
    const bigAmount = (new BigNumber(amount).multipliedBy(new BigNumber(10).exponentiatedBy(18))).toString();

    return fetchSignature(ROOT_URL + VERIFY_ROUTE, APP_ID, APP_KEY, imageData, account, GALLERY_NAME)
      .then(data => ensureConfidenceMet(data, confidenceThreshold))
      .then(data => tokenVerificationAndTransfer(token, data, toAddress, bigAmount))
      .then(tx => handleVerification(tx))
      .catch(error => this.props.actions.setError(error));
  }

  handleSubmit(toAddress, amount) {
    this.setState({
      formSubmitted: true,
      toAddress,
      amount
    });
  }

  handleBack() {
    this.setState({
      formSubmitted: false
    })
  }

  render() {
    const { toAddress, amount } = this.state;
    const existingInputs = (toAddress == "" || amount == 0) ? null : { toAddress, amount };

    return (
      <section>
          { this.props.error && <DisplayError message={this.props.error.message} /> }
          { this.state.formSubmitted
              ? <FaceDetect handleSubmit={this.verifyImage} handleBack={this.handleBack} captureType="transaction"
                            retry={this.props.error ? true : false}/>
              : <TransferForm existingInputs={existingInputs} handleSubmit={this.handleSubmit}
                              handleClose={this.props.handleClose}/>
          }
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.account,
    configs: state.configs,
    token: state.token,
    confidenceThreshold: state.confidenceThreshold,
    error: state.error
  }
};

const actionCreators = dispatch => ({
  actions: bindActionCreators(ErrorActions, dispatch)
});

export default connect(mapStateToProps, actionCreators)(CaptureTransfer);
