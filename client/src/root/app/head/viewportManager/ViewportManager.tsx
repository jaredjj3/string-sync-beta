import React from 'react';
import { compose, lifecycle } from 'recompose';
import { add, remove } from 'eventlistener';
import { withViewport } from 'enhancers';
import { utils as viewportUtils } from 'data/viewport';
import { throttle } from 'lodash';

const shouldUpdateViewport = (viewport) => (
  window.innerHeight !== viewport.height ||
  window.innerWidth !== viewport.width
);

const maybeSetViewport = throttle(({ viewport, setViewport }) => event => {
  if (shouldUpdateViewport(viewport)) {
    setViewport(viewportUtils.getViewportProps());
  }
}, 30);

const enhance = compose(
  withViewport,
  lifecycle({
    componentDidMount(): void {
      add(window, 'resize', maybeSetViewport(this.props));
    },
    componentWillUnmount(): void {
      remove(window, 'resize', maybeSetViewport(this.props));
    }
  }),
);

export default enhance(() => null);
