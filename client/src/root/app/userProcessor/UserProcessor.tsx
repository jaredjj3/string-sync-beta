import * as React from 'react';
import { compose, createSink } from 'recompose';
import { getNullUser } from 'ssUtil';

const processUser = ({ setUser }) => {
  const currentUser = window.currentUser || getNullUser();
  delete window.currentUser;
  setUser(currentUser);
};

const enhance = compose(
  withUser,
  createSink
);

export default enhance(processUser);
