import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router';

const Protected = ({ component: Component, path, isLoggedIn }) => (
  <Route
    path={path}
    render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to="/" />}
  />
);

const mapStateToProps = state => ({
  isLoggedIn: state.session.currentUser.isLoggedIn
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Protected)
);
