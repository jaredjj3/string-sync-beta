import React    from 'react';
import ReactDOM from 'react-dom';

import Root from './root';
import store from 'data/store';

document.addEventListener('DOMContentLoaded', (): void => {
  if (!(window as any).Promise) {
    document.writeln(`<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>`);
  }

  ReactDOM.render(<Root store={store} />, document.getElementById('root'));

  // FIXME: Figure out why bootstrapping the current user to the window is not working
  // delete (window as any).currentUser;
});
