import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from "./Icon";

const networkName = ({ networkId }) => {
  switch (networkId) {
    case 0: return "Not Connected"; break;
    case 1: return "Main Ethereum Network"; break;
    case 3: return "Ropsten Test Network"; break;
    case 4: return "Rinkeby Test Network"; break;
    case 42: return "Kovan Test Network"; break;
    default: return "Other Network"; break;
  }
}

const iconColorClass = ({ hasAccount, networkId }) => {
  if (!hasAccount) return "not-connected";
  switch (networkId) {
    case 0: return "not-connected"; break;
    case 1: return "main"; break;
    case 3: return "ropsten"; break;
    case 4: return "rinkeby"; break;
    case 42: return "kovan"; break;
    default: return "other"; break;
  }
}

const icon = ({ networkId }) => {
  switch (networkId) {
    case 0: return "plug"; break;
    case 1: return "square"; break;
    case 3: return "circle"; break;
    case 4: return "square"; break;
    case 42: return ['far', 'square']; break;
    default: return "map-marker"; break;
  }
}

const OnlineStatus = props => (
  <div className="text-truncate text-white">
    <small >

      <Icon icon={icon(props)} size="lg" className={`color-eth-${iconColorClass(props)} p-1`} />

      <span className="pl-1">{ networkName(props) }</span>
     </small>
  </div>
);

const mapStateToProps = state => {
  return {
    networkId: ~~(state.networkId),
    hasAccount: state.account !== null
  }
};


export default connect(mapStateToProps)(OnlineStatus);