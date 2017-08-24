import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import {configureStore} from './store/configureStore';
import { initialState } from './store/InitialState';

const rootElement = document.getElementById('root');
const store = configureStore(initialState);

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const RootContainer = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
         <RootContainer store={store} />
      </AppContainer>,
      rootElement
    );
  });
}
