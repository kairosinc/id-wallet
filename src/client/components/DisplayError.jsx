import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ErrorActions from '../actions/ErrorActions';

const DisplayError = props => (
  <div className="alert alert-danger w-100 position-absolute text-center fixed-top" role="alert" style={{zIndex:2000}}>
    { props.message !== undefined && props.message }
    <button type="button" className="close"
        onClick={() => props.actions.setError(null)} >
        <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ErrorActions, dispatch)
});

export default connect(null, mapDispatchToProps)(DisplayError);
