import React from 'react';
import Head from './head';
import Body from './body';
import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider, Layout } from 'antd';
import { withRouter } from 'react-router';

const scrollToTop = (): void => {
  window.scrollTo(null, 0);
};

const App = ({ history }) => {
  history.listen(scrollToTop);

  return (
    <div className="App">
      <LocaleProvider locale={enUS}>
        <div className="App__layout">
          <Head />
          <Body />
        </div>
      </LocaleProvider>
    </div>
  );
};

export default withRouter(App);
