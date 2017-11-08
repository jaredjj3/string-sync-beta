import React from 'react';
import { withRouter } from 'react-router';

import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider, Layout } from 'antd';

import AppFunctionality from './functionality';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Gradient from 'comp/gradient';
import MobileNav from 'comp/mobile/nav';

const scrollToTop = (): void => {
  window.scrollTo(null, 0);
};

const App = ({ history }) => {
  history.listen(scrollToTop);

  return (
    <div className="App">
      <LocaleProvider locale={enUS}>
        <div className="App__layout">
          <AppFunctionality />
          <Layout>
            <Header />
            <Content />
            <Footer />
            <MobileNav />
          </Layout>
        </div>
      </LocaleProvider>
    </div>
  );
};

export default withRouter(App);
