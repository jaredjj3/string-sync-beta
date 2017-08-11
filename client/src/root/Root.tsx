import React from 'react';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import Library from './library';
import Search from './search';
import Login from './login';
import NotationShow from './notation/show';
import NotationEdit from './notation/edit';

const Root = ({ store }): any => {

  const scrollToTop = (): void => { window.scrollTo(0, 0); };

  return (
    <Provider store={store}>
      <Router
        history={browserHistory}
        onUpdate={scrollToTop}
      >
        <Route path="/" component={App}>
          <IndexRoute component={Library} />
          <Route path="login" component={Login} />
          <Route path="search" component={Search} />
          <Route path=":id" component={NotationShow} />
          <Route path=":id/edit" component={NotationEdit} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
