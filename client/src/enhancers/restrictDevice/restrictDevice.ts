import { Component } from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';

import { withDeviceType } from 'enhancers';

const restrictDevice = (deviceType: string) => (Wrapped: Component): Component => (
  compose(
    withDeviceType,
    branch(
      props => props.deviceType && props.deviceType !== deviceType,
      renderComponent(Wrapped),
      renderNothing
    )
  )(Wrapped)
);

export default restrictDevice;
