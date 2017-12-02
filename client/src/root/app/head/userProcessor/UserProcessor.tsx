import React from 'react';
import { connect } from 'react-redux';
import { compose, createSink } from 'recompose';

import getNullUser from 'stringSyncUtil';
import { receiveUser } from 'data/session/actions';

import { User } from 'types';

const processUser = ({ receiveUser }) => {
  const currentUser = window.currentUser || getNullUser();
  delete window.currentUser;
  receiveUser(currentUser);
};

const mapDispatchToProps = dispatch => ({
  receiveUser: (user: User) => dispatch(receiveUser(user))
});

export default compose(
  connect(null, mapDispatchToProps)
)(createSink(processUser));
