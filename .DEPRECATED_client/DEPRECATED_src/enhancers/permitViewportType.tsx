import React from 'react';
import { compose, branch, renderComponent, renderNothing } from 'recompose';
import { withViewport } from 'enhancers';

const permitViewportType = (viewportType: string) => (Component: any): any => (
  compose(
    withViewport,
    branch(
      ({ viewport }) => viewport.type && viewport.type === viewportType,
      renderComponent(Component),
      renderNothing
    )
  )(Component)
);

export default permitViewportType;
