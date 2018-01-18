import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { Provider } from 'react-redux';
import { withRouter, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import enUS from 'antd/lib/locale-provider/en_US.js';
import { LocaleProvider } from 'antd';
import { NotificationSystem, Routes, ViewportManager, UserProcessor, LoadingMask } from './';

const scrollToTop = (): void => {
  window.scrollTo(null, 0);
};

const enhance = compose(
  withRouter,
  lifecycle({
    componentDidMount(): void {
      this.props.history.listen(scrollToTop);
    },
    componentDidUpdate(): void {
      this.props.history.listen(scrollToTop);
    }
  })
);

const AppInner = enhance(styled.div.attrs({
  id: 'App',
  className: 'App'
})``);
const AppContent = styled.main``;
const AppFunctionality = styled.div`
  display: none;
`;

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <AppInner>
        <LocaleProvider locale={enUS}>
          <AppContent>
            <AppFunctionality>
              <NotificationSystem />
              <ViewportManager />
              <UserProcessor />
              <LoadingMask />
            </AppFunctionality>
            <Routes />
          </AppContent>
        </LocaleProvider>
      </AppInner>
    </BrowserRouter>
  </Provider>
);

export default App;
