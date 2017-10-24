import React from 'react';
import { Route } from 'react-router-dom';

import About from './about';
import Dashboard from './dashboard';
import Home from './home';
import Library from './library';
import Login from './login';
import NotationEdit from './notation/edit';
import NotationShow from './notation/show';
import Search from './search';
import Signup from './signup';
import Upload from './notation/new';

const Routing = () => (
  <div className="App--routes">
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/library" component={Library} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/search" component={Search} />
    <Route path="/upload" component={Upload} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/n/:id" component={NotationShow} />
    <Route path="/n/:id/edit" component={NotationEdit} />
  </div>
);

export default Routing;
