import React from 'react';

import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider, Layout } from 'antd';

import Functionality from './functionality';
import Header from './header';
import Content from './content';
import Footer from './footer';

const App = () => (
  <div className="App">
    <LocaleProvider locale={enUS}>
      <div className="App__layout">
        <Functionality />
        <Layout>
          <Header />
          <Content />
          <Footer />
        </Layout>
      </div>
    </LocaleProvider>
  </div>
);

export default App;
