import React    from 'react';
import ReactDOM from 'react-dom';

import App from 'root/app';

document.addEventListener('DOMContentLoaded', (): void => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
});
