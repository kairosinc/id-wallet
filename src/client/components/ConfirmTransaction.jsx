import React, { Component } from "react";
import { connect } from 'react-redux';

import { Close } from './Button';

class ConfirmTransaction extends React.Component {
    constructor(props) {
        super(props);

        this.getNetworkSubdomain = this.getNetworkSubdomain.bind(this);
        this.getEthScanURI = this.getEthScanURI.bind(this);
        this.linkToViewOnEtherscan = this.linkToViewOnEtherscan.bind(this);

        this.recognizedNetorkIds = [1, 3, 4, 42];
    }

    getNetworkSubdomain(networkId) {
        switch (networkId) {
            case 1:
                return ""; // main net
            case 3:
                return "ropsten.";
            case 4:
                return "rinkeby.";
            case 42:
                return "kovan.";
        }
    }

    getEthScanURI(tx, networkId) {
        return `https://${this.getNetworkSubdomain(networkId)}etherscan.io/tx/${tx}`;
    }

    linkToViewOnEtherscan(tx, networkId) {
        return (
            <p className="mb-0"><small><a className="text-success" href={this.getEthScanURI(tx, networkId)} target="_blank">View on
                etherscan</a></small></p>
        );
    }

    componentDidMount() {
        window.jQuery("#confirmationModal").modal('show');
    }

    render() {

        return (
            <div className="modal" tabIndex="-1" role="dialog" id="confirmationModal">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-secondary">
                            <h3 className="modal-title mx-auto p-4 font-weight-bold">{this.props.message()}</h3>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <span className="text-uppercase font-weight-light">Transaction hash</span>
                            <p className="mb-0"><small><strong>{this.props.tx}</strong></small></p>
                            {this.recognizedNetorkIds.includes(this.props.networkId) && this.linkToViewOnEtherscan(this.props.tx, this.props.networkId)}
                        </div>
                        <div className="modal-footer justify-content-center">
                            <Close onClick={this.props.handleClick} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    networkId: ~~(state.networkId)
  }
};

export default connect(mapStateToProps)(ConfirmTransaction);
