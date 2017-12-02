import React from 'react';

const inContainer = (Wrapped: any, props: any) => () => (
  <div {...props}>
    <Wrapped />
  </div>
);

export default inContainer;
