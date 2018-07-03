import React from "react";
import { connect } from 'react-redux';

const AccountInfo = (props) => (
  <div className="mx-3 d-flex flex-row flex-wrap align-items-center bg-blue">
      <span className="text-white p-2 mx-auto ml-sm-0 text-truncate mw-100">{props.account}</span>
      <div className="mx-auto mr-sm-0 mb-2 mb-sm-0">
        { props.callout() }
      </div>
  </div>
);

const mapStateToProps = state => {
  return {
    account: state.account
  }
};

export default connect(mapStateToProps)(AccountInfo);
