import React    from 'react';
import ReactDOM from 'react-dom';

import Root from './root';
import store from 'data/store';

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
