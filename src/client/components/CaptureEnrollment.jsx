import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DisplayError from './DisplayError';
import FaceDetect from '../components/FaceCapture';
import { tokenRegistration } from '../utils/EthereumTransactions'
import { fetchSignature } from '../utils/signature';
import * as ErrorActions from '../actions/ErrorActions';


class CaptureEnrollment extends React.Component {
  constructor(props) {
    super(props);
    this.enrollImage = this.enrollImage.bind(this);
  }

  enrollImage(imageData) {
    const { account, token, handleRegistration, configs } = this.props;
    const { ROOT_URL, ENROLL_ROUTE, APP_ID, APP_KEY, GALLERY_NAME } = configs;

    return fetchSignature(ROOT_URL + ENROLL_ROUTE, APP_ID, APP_KEY, imageData, account, GALLERY_NAME)
      .then(data => tokenRegistration(token, data))
      .then((tx) => handleRegistration(tx))
      .catch(error => this.props.actions.setError(error));
  }

  render() {
    return (
        <section>
          { this.props.error && <DisplayError message={this.props.error.message} /> }
          <FaceDetect handleSubmit={this.enrollImage} handleBack={this.props.handleBack} captureType="enrollment"
                      retry={!!this.props.error}/>
        </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    account: state.account,
    configs: state.configs,
    token: state.token,
    error: state.error
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ErrorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CaptureEnrollment);
