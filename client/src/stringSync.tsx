import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'app';
import { store } from 'data';
import { Maestro, RafLoop, Loader, GlobalProps } from 'services';

declare global {
  interface Window {
    notification: any;
    currentUser: any;
    $: any;
    store: any;
    assets: any;
    ss: {
      maestro: Maestro;
      rafLoop: RafLoop;
      loader: Loader;
      globalProps: GlobalProps;
    }
  }
}

window.ss = {
  maestro: new Maestro(),
  rafLoop: new RafLoop(),
  loader: new Loader(),
  globalProps: new GlobalProps()
};

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
});
