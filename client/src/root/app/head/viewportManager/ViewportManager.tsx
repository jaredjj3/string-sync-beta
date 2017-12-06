import React from 'react';
import { compose, lifecycle } from 'recompose';
import { add, remove } from 'eventlistener';
import { withViewport } from 'enhancers';
import { getViewport } from 'stringSyncUtil';
import { throttle } from 'lodash';

const shouldUpdateViewport = (viewport) => (
  $(window).height() !== viewport.height ||
  $(window).width() !== viewport.width
);

const maybeSetViewport = throttle(({ viewport, setViewport }) => event => {
  if (shouldUpdateViewport(viewport)) {
    setViewport(getViewport());
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
