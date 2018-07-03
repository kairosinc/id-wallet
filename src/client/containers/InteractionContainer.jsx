import React from 'react';
import { connect } from 'react-redux';

import EnrollAccount from '../components/EnrollAccount';
import NewTransaction from '../components/NewTransaction';

const InteractionContainer = ({ noAccount, notEnrolled }) => {
  if (noAccount) return (
      <div className="mx-3 bg-blue" style={{minHeight:52}}>&nbsp;</div>
  );

  if (notEnrolled) {
    return <EnrollAccount />
  } else {
    return <NewTransaction />
  }
};

const mapStateToProps = state => {
  return {
    noConnection: state.networkId === 0,
    noAccount: state.account === null,
    notEnrolled: !state.registered
  }
};

export default connect(mapStateToProps)(InteractionContainer);
