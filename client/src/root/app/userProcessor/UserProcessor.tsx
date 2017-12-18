import * as React from 'react';
import { compose, createSink } from 'recompose';
import { getNullUser, camelCaseObjKeys } from 'ssUtil';
import { withUser } from 'enhancers';

const processUser = ({ user }) => {
  const currentUser = window.currentUser || getNullUser();
  delete window.currentUser;
  user.dispatch.setUser(camelCaseObjKeys(currentUser, false));
};

const enhance = compose(
  withUser,
  createSink
);

export default enhance(processUser);
