import React from 'react';

import enUS from 'antd/lib/locale-provider/en_US.js';
import LocaleProvider from 'antd/lib/locale-provider';

import Footer from './footer';
import Functionality from './functionality';
import Header from './header';
import Routing from './routing';

const App = () => (
  <div className="App">
    <LocaleProvider locale={enUS}>
      <div className="App__content">
        <Functionality />
        <Header />
        <Routing />
        <Footer />
      </div>
    </LocaleProvider>
  </div>
);

export default App;
