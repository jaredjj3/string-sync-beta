import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider } from 'antd';
import { withRouter } from 'react-router';
import { NotificationSystem } from 'sinks';
import Routes from 'root/routes';

const scrollToTop = (): void => {
  window.scrollTo(null, 0);
};

const App = () => (
  <div className="App">
    <LocaleProvider locale={enUS}>
      <main>
        <div id="App__functionality" className="hidden">
          <NotificationSystem />
        </div>
        <Routes />
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
