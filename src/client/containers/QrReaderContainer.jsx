import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QrReader from 'react-qr-reader'
import DisplayError from "../components/DisplayError";
import * as ErrorActions from '../actions/ErrorActions';
import { Cancel } from "../components/Button";

class QrReaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleError = this.handleError.bind(this);
  }

  handleError(error) {
    this.props.actions.setError(error);
  }

  render() {
    const delay = 500;

    return this.props.error ? (
      <DisplayError message={this.props.error.message} />
    ) :
      <div className="d-flex flex-column align-self-center pb-3" style={{minWidth:300}}>
        <QrReader
          delay={delay}
          onError={this.handleError}
          onScan={this.props.handleScan}
          onClose={this.props.handleClose}
        />
        <div className="clearfix py-1">&nbsp;</div>
        <Cancel
          aria-label="close qr scanner"
          onClick={this.props.handleClose}
        />
      </div>
  }
}

const mapStateToProps = state => {
  return {
    error: state.error
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ErrorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QrReaderContainer);
