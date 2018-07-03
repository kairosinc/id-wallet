import React from 'react';
import { connect } from 'react-redux';

import OnlineStatus from './OnlineStatus';
import NavActionMessage from './NavActionMessage';

const Nav = props => {
  let actionMessage, href, actionCall, target = "";
  if (props.noConnection) {
      actionMessage = "Install MetaMask to connect this wallet to the Ethereum blockchain";
      href = "https://metamask.io/";
      actionCall = "Install MetaMask";
      target = "_blank";
  }else if (props.noAccount) {
      actionMessage = "Log in to MetaMask to connect this wallet to the Ethereum blockchain";
      href = "/";
      actionCall = "Log in to MetaMask";
      target = "_self";
  }

  return (
      <nav role="navigation" className={ "container-fluid d-flex flex-row align-items-center py-2 mb-4 "
                + (props.noConnection || props.noAccount ? "flex-wrap" : "flex-nowrap")}
        style={{minHeight:70}}>
          <div className="cursor-pointer text-white text-nowrap pr-5" onClick={props.onReset}>
              <img className="mr-2" width="30" src="/static/img/logo.png" />
              <strong>{ props.walletName }</strong>
              <span className="ml-2 badge badge-pill bg-blue text-muted">ALPHA</span>
          </div>
              {
                props.noConnection || props.noAccount ?
                    <div className="mx-auto ml-lg-auto mr-lg-0 py-3 py-lg-0">
                        <NavActionMessage message={actionMessage} href={href} target={target} actionCall={actionCall} />
                    </div>
                  :
                    <div className="ml-auto" style={{maxWidth: 200, minWidth:100}}>
                      <OnlineStatus/>
                    </div>
              }
      </nav>
  );
}

const mapStateToProps = state => {
  return {
      walletName: state.configs.WALLET_NAME,
      noConnection: state.networkId === 0,
      noAccount: state.account === null,
  }
};

export default connect(mapStateToProps)(Nav);

