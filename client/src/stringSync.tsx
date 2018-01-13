import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from 'root';
import { store } from 'data';
import { maestro, rafLoop } from 'services';

declare global {
  interface Window {
    notification: any;
    currentUser: any;
    $: any;
    store: any;
    assets: any;
    ss: {
      maestro: any;
      rafLoop: any;
    }
  }
}

window.ss = {
  maestro,
  rafLoop
};

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
