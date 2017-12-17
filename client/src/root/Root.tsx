import * as React from 'react';
import { Provider } from 'react-redux';
import App from './app';

const Root = ({ store }) => (
  <div id="root">
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);

export default Root;
