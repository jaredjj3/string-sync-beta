import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from 'root';

declare global {
  interface Window {
    currentUser: any;
    $: any;
    store: any;
    assets: any;
  }
}

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(<Root store={{}} />, document.getElementById('root'));
});
