import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AuthRoute from 'comp/routes/auth';
import ProtectedRoute from 'comp/routes/protected';

import App from './app';
import Library from './library';
import Login from './login';
import NotationEdit from './notation/edit';
import NotationShow from './notation/show';
import Search from './search';
import Signup from './signup';
import Upload from './upload';

enum RedirectTypes {
  AUTH = 'AUTH',
  PROTECT = 'PROTECT'
}

const Root = ({ store }): any => {

  const scrollToTop = (): void => { window.scrollTo(0, 0); };

  const maybeRedirect = (behavior: RedirectTypes) => {
    return (nextState, replace) => {
      const isLoggedIn = Boolean(store.getState().session.currentUser.id);

      switch (behavior) {
        case RedirectTypes.AUTH:
          if (isLoggedIn) {
            replace('/');
          }
          return;
        case RedirectTypes.PROTECT:
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
          <Route path="login" component={Login} onEnter={maybeRedirect(RedirectTypes.AUTH)}/>
          <Route path="signup" component={Signup} onEnter={maybeRedirect(RedirectTypes.AUTH)}/>
          <Route path="search" component={Search} />
          <Route path="upload" component={Upload} onEnter={maybeRedirect(RedirectTypes.PROTECT)} />
          <Route path="n/:id" component={NotationShow} />
          <Route path="n/:id/edit" component={NotationEdit} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
