import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Helmet from 'react-helmet';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Web3 from 'web3';
import { withRouter } from 'react-router-dom'

import * as AppActions from './actions/AppActions'

import Nav from './components/Nav';
import WalletHome from './pages/WalletHome';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { randomKey: 1 };

    this.onReset = this.onReset.bind(this);
  }

  componentWillMount() {
    this.props.actions.setupApp(this.props.configs);
  }

  onReset() {
    this.setState({
      randomKey: Math.random()
    });
  }

  render() {
    this.props.shouldReload && location.reload()
    return (
      <div style={{minWidth: 350}}>
        <Helmet titleTemplate={ `%s | ${this.props.name}` } defaultTitle={ this.props.name } />
        <Nav onReset={this.onReset} />
        <Switch>
          <Route exact path={ "/" } render={ () => (<WalletHome key={this.state.randomKey} />) } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

const actionCreators = dispatch => {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    name: state.configs.NAME,
    shouldReload: state.shouldReload
  }
}

export default withRouter(connect(mapStateToProps, actionCreators)(App));
