import * as React from 'react';
import { compose, createSink } from 'recompose';
import { getNullUser, camelCaseObjKeys } from 'utilities';
import { withUser } from 'enhancers';

const enhance = compose(
  withUser,
  createSink
);

const processUser = ({ user }) => {
  const currentUser = window.currentUser || getNullUser();
  delete window.currentUser;
  user.dispatch.setUser(camelCaseObjKeys(currentUser, false));
};

export default enhance(processUser);
