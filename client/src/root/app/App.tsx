import * as React from 'react';
import NotificationSystem from './notificationSystem';
import Routes from 'root/routes';
import ViewportManager from './viewportManager';
import UserProcessor from './userProcessor';
import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider } from 'antd';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';

const scrollToTop = (): void => {
  window.scrollTo(null, 0);
};

const App = () => (
  <div id="App" className="App">
    <LocaleProvider locale={enUS}>
      <main>
        <div className="App__functionality hidden">
          <NotificationSystem />
          <ViewportManager />
          <UserProcessor />
        </div>
        <div className="App__body" >
          <Routes />
        </div>
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
