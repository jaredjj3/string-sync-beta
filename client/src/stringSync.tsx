import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from 'root';
import store from 'data/store';

declare global {
  interface Window {
    notification: any;
    currentUser: any;
    $: any;
    store: any;
    assets: any;
  }
}

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
