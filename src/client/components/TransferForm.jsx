import React from "react";
import { connect } from 'react-redux';
import QrReaderContainer from "../containers/QrReaderContainer";
import { Cancel } from "./Button";
import Icon from "./Icon";
import Web3Utils from "web3-utils";


class TransferForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toAddress: "",
      amount: "",
      isScanning: false,
      amtError: true,
      amtErrorMsg: "",
      adrError: true,
      adrErrorMsg: " ",
      balance: this.props.balance
    };

    this.handleAmtChange = this.handleAmtChange.bind(this);
    this.handleAdrChange = this.handleAdrChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startScanning = this.startScanning.bind(this);
    this.stopScanning = this.stopScanning.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleTxFormClose = this.handleTxFormClose.bind(this);
    this.scannerDelay = 500;
  }

  handleAmtChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target.value});
    let amount = event.target.value;
    if (amount > this.state.balance) {
        this.setState({
          amtErrorMsg: "needs to be less than current balance"
        });
    } else if (amount === "") {
        this.setState({
          amtErrorMsg: "enter a number"
        });
    } else if (amount < 1e-20) {
        this.setState({
          amtErrorMsg: "must be more than zero"
        });
    } else if(amount.match(/[^0-9\.\-eE].*$/)){
        this.setState({
          amtErrorMsg:"enter a number"
        });
    } else if(amount.match(/^[0-9]+(e)$|^[0-9]+(e)+(\-)$|^[0-9]+(\-)|^(\-)+(.)*$/)){
        this.setState({
          amtErrorMsg:"...."
        });
    } else {
      this.setState({
        amtError: false,
        amtErrorMsg: ""
      });
    }

    this.setState({ amount: amount});
  }

  handleAdrChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target.value });

    if (Web3Utils.isAddress(this.state.toAddress) === false) {
      if (this.state.toAddress.match(/^.[a-zA-Z0-9]{42,}$/)) {
          this.setState({
            adrErrorMsg: "this address is too long"
          });
      } else if (this.state.toAddress.match(/^.[a-zA-Z0-9]{0,42}$/)) {
          this.setState({
            adrErrorMsg: "scan QR code, paste or type a valid public address"
          });
      } else if (this.state.toAddress.match(/[^a-zA-Z0-9].*$/)) {
          this.setState({
            adrErrorMsg: "remove any spaces or special characters"
          });
      } else {
        this.setState({
          adrErrorMsg: ""
        });
      }
    } 
    else if (Web3Utils.isAddress(this.state.toAddress) === true) {
      this.setState({
        adrError: false,
        adrErrorMsg: ""
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    window.jQuery("#sendTransactionModal").modal('hide');

    const { toAddress, amount } = this.state;
    this.props.handleSubmit(toAddress, amount);
  }

  startScanning() {
    this.setState({
      isScanning: true
    });
  }

  stopScanning(event) {
    this.setState({
      isScanning: false
    });
  }

  handleScan(result) {
    if (result !== null) {
      this.setState({
        toAddress: result,
        isScanning: false
      });
    }
  }

  handleTxFormClose(event) {
      window.jQuery("#sendTransactionModal").modal('hide');
      this.props.handleClose(event);
  }

  componentWillMount() {
    const { existingInputs } = this.props;

    if (existingInputs !== null) {
      const { toAddress, amount } = existingInputs;
      this.setState({ toAddress, amount, balance: this.props.balance });
    }
  }

  componentDidMount() {
    if (!this.state.isScanning) {
        window.jQuery("#sendTransactionModal").modal('show');
    }
  }

  render(props) {
    return (
      <div className="modal" tabIndex="-1" role="dialog" id="sendTransactionModal">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content" style={{minWidth:380}}>
            <div className="modal-header border-bottom-0">
              <h3 className="modal-title mx-auto p-4 font-weight-bold">Send from {this.props.wallet}</h3>
            </div>
            { this.state.isScanning ? (
              <QrReaderContainer
                aria-label="qr code scanner"
                handleScan={this.handleScan}
                handleClose={this.stopScanning}
              />
            ) : (
              <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                      <label className="text-uppercase small" id="toAddressLabel" aria-label="input ethereum account address">
                        Recipient Address
                      </label>
                      <div className="input-group">
                        <input name="toAddress" aria-label="send to public ethereum account address input" type="text"
                          value={this.state.toAddress} placeholder="0x..."
                          className="form-control border-right-0"
                          onKeyUp={this.handleAdrChange}
                          onChange={this.handleAdrChange}
                          onBlur={this.handleAdrChange}
                          autoComplete="off"
                          required
                        />
                        <div className="input-group-append">
                          <span className="cursor-pointer input-group-text p-1 bg-white border-left-0"
                                onClick={this.startScanning} aria-label="open qr code scanner" aria-haspopup="true">
                            <Icon icon={["fas","qrcode"]} className="fa-lg" />
                          </span>
                        </div>
                      </div>
                      <div className="text-danger small" style={{height:20}}>{this.state.adrErrorMsg}</div>
                    </div>

                    <div className="form-group">
                      <label className="text-uppercase small" aria-label="amount of tokens to send">Amount to Send</label>
                      <div className="input-group">
                        <input name="amount" aria-label="amount of tokens to send input" type="number" step="0.0000000001"
                               value={this.state.amount} className="form-control border-right-0" placeholder="0.0"
                          // onKeyUp={this.handleAmtChange}
                          onChange={this.handleAmtChange}
                          onBlur={this.handleAmtChange}
                          autoComplete="off"
                          required
                        />
                        <div className="input-group-append">
                          <span className="input-group-text p-1 bg-white text-muted border-left-0">
                              {this.props.tokenSymbol}
                          </span>
                        </div>
                      </div>
                      <div className="text-danger small" style={{height:20}}>{this.state.amtErrorMsg}</div>
                    </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <Cancel
                    aria-label="cancel transaction"
                    onClick={this.handleTxFormClose} />
                  <input
                      aria-label="submit token transaction?"
                      type="submit"
                      value="Send"
                      className="btn btn-success text-bold text-uppercase mt-auto mx-1 px-5"
                      disabled={this.state.amtError || this.state.adrError ? ("true") : ("")}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    balance: state.balance,
    tokenSymbol: state.configs.TOKEN_SYMBOL,
    wallet: state.configs.WALLET_NAME
  };

};

export default connect(mapStateToProps)(TransferForm);
