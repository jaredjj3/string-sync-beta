import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider } from 'antd';
import { withRouter } from 'react-router';

const scrollToTop = (): void => {
  window.scrollTo(null, 0);
};

const App = () => (
  <div className="App">
    <LocaleProvider locale={enUS}>
      <main>
        
      </main>
    </LocaleProvider>
  </div>
);

const enhance = compose(
  withRouter,
  lifecycle({
    componentDidUpdate: ({ history }) => {
      history.listen(scrollToTop);
    }
  })
);

export default enhance(App);
