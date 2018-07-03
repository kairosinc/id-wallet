import 'babel-polyfill';

import $ from 'jquery';
import Tether from 'tether';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './App';
import styles from './styles/main.scss';
import bootstrapjs from './../../node_modules/bootstrap/dist/js/bootstrap.js';
import configureStore from './store/store';

const store = configureStore();

window.jQuery = $;
window.Tether = Tether;


const forceHttps = (configs) => {
  return new Promise((resolve, reject) => {
    if (configs.IS_PRODUCTION && location.protocol !== "https:") {
      location.protocol = "https:";
      reject("Redirect to https:");
    }
    resolve(configs);
  });
}

const getEnv = () => {
  return fetch(window.location.href + 'configs')
    .then(response => response.json())
    .then(configs => forceHttps(configs))
}

const makeRendering = (configs) => {
  const wrapper = (element) => (
    <BrowserRouter history={browserHistory}>
      <AppContainer>
        {element}
      </AppContainer>
    </BrowserRouter>
  );

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <AppContainer>
          <App configs={configs} />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app")
  );

  if (module.hot) {
    module.hot.accept("./App", () => {
      const HotReloadedApp = require("./App").default;
      ReactDOM.render(
        wrapper(<HotReloadedApp />),
        document.querySelector(".app")
      );
    });
  }
}

getEnv()
  .then(configs => makeRendering(configs))
  .catch(error => console.error(error));
