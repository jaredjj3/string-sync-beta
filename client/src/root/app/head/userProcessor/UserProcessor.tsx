import React from 'react';
import { connect } from 'react-redux';
import { compose, createSink } from 'recompose';
import { getNullUser } from 'stringSyncUtil';
import sessionActions from 'data/api/session/actions';
import { User } from 'types';

const { setUser } = sessionActions;

const processUser = ({ setUser }) => {
  const currentUser = window.currentUser || getNullUser();
  delete window.currentUser;
  setUser(currentUser);
};

const mapDispatchToProps = dispatch => ({
  setUser: (user: User) => dispatch(setUser(user))
});

export default compose(
  connect(null, mapDispatchToProps)
)(createSink(processUser));
