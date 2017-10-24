import React from 'react';

import enUS from 'antd/lib/locale-provider/en_US.js';
import LocaleProvider from 'antd/lib/locale-provider';

import UserProcessor from './userProcessor';
import ViewportManager from './viewportManager';
import Routing from './routing';

const App = () => (
  <div className="App">
    <LocaleProvider locale={enUS}>
      <div className="App__content">
        <Routing />
        <UserProcessor />
        <ViewportManager />
      </div>
    </LocaleProvider>
  </div>
);

export default App;
