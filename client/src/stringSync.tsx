import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';
import store from 'data/store';
import { NotificationApi } from 'antd/lib/notification';
import { User } from 'types';

declare global {
  interface Window {
    notification: NotificationApi;
    currentUser: User;
    $: any;
    store: any;
    assets: any;
  }
}

document.addEventListener('DOMContentLoaded', (): void => (
  ReactDOM.render(<Root store={store} />, document.getElementById('root'))
));
