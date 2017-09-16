import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import Library from './library';
import Login from './login';
import NotationEdit from './notation/edit';
import NotationShow from './notation/show';
import Search from './search';
import Signup from './signup';
import Upload from './notation/new';
import Dashboard from './dashboard';

type RedirectTypes = 'AUTH' | 'PROTECT';

const Root = ({ store }): any => {

  const scrollToTop = (): void => { window.scrollTo(0, 0); };

  const maybeRedirect = (behavior: RedirectTypes) => {
    return (nextState, replace) => {
      const isLoggedIn = Boolean(store.getState().session.currentUser.id);

      switch (behavior) {
        case 'AUTH':
          if (isLoggedIn) {
            replace('/');
          }
          return;
        case 'PROTECT':
          if (!isLoggedIn) {
            replace('/');
          }
          return;
        default:
          return;
      }
    };
  };

  return (
    <Provider store={store}>
      <Router
        history={browserHistory}
        onUpdate={scrollToTop}
      >
        <Route path="/" component={App}>
          <IndexRoute component={Library} />
          <Route path="login" component={Login} onEnter={maybeRedirect('AUTH')}/>
          <Route path="signup" component={Signup} onEnter={maybeRedirect('AUTH')}/>
          <Route path="search" component={Search} />
          <Route path="upload" component={Upload} onEnter={maybeRedirect('PROTECT')} />
          <Route path="dashboard" component={Dashboard} onEnter={maybeRedirect('PROTECT')} />
          <Route path="n/:id" component={NotationShow} />
          <Route path="n/:id/edit" component={NotationEdit} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
