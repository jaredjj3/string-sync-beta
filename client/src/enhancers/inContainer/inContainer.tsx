
import React from 'react';
import { compose, nest } from 'recompose';

const inContainer = (Wrapped: any, props) => (
  <div {...props}>
    <Wrapped />
  </div>
);

export default inContainer;
