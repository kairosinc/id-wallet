import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import * as RegistrationActions from '../actions/RegistrationActions';
import PreEnrollment from './PreEnrollment';
import CaptureEnrollment from './CaptureEnrollment';
import ConfirmTransaction from './ConfirmTransaction';

class EnrollAccount extends React.Component {

  constructor(props) {
    super(props);

    this.SHOULD_ENROLL = "SHOULD_ENROLL";
    this.IS_ENROLLING = "IS_ENROLLING";
    this.DID_ENROLL = "DID_ENROLL";

    this.startEnrollment = this.startEnrollment.bind(this);
    this.finishEnrollment = this.finishEnrollment.bind(this);
    this.closeEnrollment = this.closeEnrollment.bind(this);
    this.cancelEnrollment = this.cancelEnrollment.bind(this);

    this.state = {
      enrollmentStep: this.SHOULD_ENROLL,
      enrollmentTx: null
    }
  }

  startEnrollment() {
    this.setState({
      enrollmentStep: this.IS_ENROLLING
    });
  }

  finishEnrollment(tx) {
    this.setState({
      enrollmentTx: tx,
      enrollmentStep: this.DID_ENROLL
    });
  }

  closeEnrollment() {
    window.jQuery("#confirmationModal").modal('hide');
    this.props.actions.setRegistered(true);
  }

  cancelEnrollment() {
    this.setState({
      enrollmentStep: this.SHOULD_ENROLL
    });
  }

  confirmationMessage() {
    return (
      <div className="d-flex flex-column align-items-center top">
        <h3>Success! You are enrolled</h3>
      </div>
    )
  }

  render() {
    if (this.state.enrollmentStep == this.SHOULD_ENROLL) {
      return (
        <PreEnrollment handleClick={this.startEnrollment} />
      );
    } else if (this.state.enrollmentStep == this.IS_ENROLLING) {
      return (
        <CaptureEnrollment handleRegistration={this.finishEnrollment} handleBack={this.cancelEnrollment} />
      );
    } else if (this.state.enrollmentStep == this.DID_ENROLL) {
      return (
        <ConfirmTransaction
          tx={this.state.enrollmentTx}
          handleClick={this.closeEnrollment}
          message={this.confirmationMessage}
        />
      );
    } else return null;
  }
}

const actionCreators = dispatch => {
  return {
    actions: bindActionCreators(RegistrationActions, dispatch)
  };
};

export default connect(null, actionCreators)(EnrollAccount);
