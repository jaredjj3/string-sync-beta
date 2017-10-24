import React from 'react';

import enUS from 'antd/lib/locale-provider/en_US.js';
import LocaleProvider from 'antd/lib/locale-provider';

import UserProcessor from './userProcessor';
import ViewportManager from './viewportManager';
import Routing from './routing';
import NotificationSys from './notificationSys';

const App = () => (
  <div className="App">
    <LocaleProvider locale={enUS}>
      <div className="App__content">
        <Routing />
        <UserProcessor />
        <ViewportManager />
        <NotificationSys />
      </div>
    </LocaleProvider>
  </div>
);

export default App;
